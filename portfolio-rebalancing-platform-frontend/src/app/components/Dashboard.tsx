import { useState, useMemo, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { Search, ArrowUpDown, RefreshCw, Plus, CheckCircle, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { statusColors } from '../../utils/statusColors';
import { ComplianceDashboard } from './ComplianceDashboard';
import {
  mockClients,
  mockHoldings,
  calculateDrift,
  getDriftColor,
  getClientProposalStatus,
  type Client,
  type ProposalStatus,
  type RiskProfile
} from '../../data/mockData';

export function Dashboard() {
  const { user } = useAuth();
  const location = useLocation();
  const [successMessage, setSuccessMessage] = useState<string>('');

  // Show success message from navigation state
  useEffect(() => {
    if (location.state?.message) {
      setSuccessMessage(location.state.message);
      const timer = setTimeout(() => setSuccessMessage(''), 5000);
      return () => clearTimeout(timer);
    }
  }, [location]);

  const [searchTerm, setSearchTerm] = useState('');
  const [riskProfileFilter, setRiskProfileFilter] = useState<RiskProfile | 'All'>('All');
  const [driftFilter, setDriftFilter] = useState<'All' | 'Green' | 'Amber' | 'Red'>('All');
  const [sortField, setSortField] = useState<'name' | 'drift' | 'lastReview'>('drift');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [lastUpdated] = useState(new Date().toLocaleString());

  // Calculate client data with drift - filtered by advisor for Financial Advisors
  const clientData = useMemo(() => {
    const clients = user?.role === 'Financial Advisor'
      ? mockClients.filter(c => c.assignedAdvisorId === user.userId)
      : mockClients;

    return clients.map(client => {
      const holdings = mockHoldings.filter(h => h.clientId === client.clientId);
      const drift = calculateDrift(holdings);
      const driftColor = getDriftColor(drift);
      const proposalStatus = getClientProposalStatus(client.clientId);

      return {
        ...client,
        drift,
        driftColor,
        proposalStatus
      };
    });
  }, [user]);

  // Apply filters and sorting
  const filteredAndSortedData = useMemo(() => {
    let filtered = clientData;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(client =>
        client.fullName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Risk profile filter
    if (riskProfileFilter !== 'All') {
      filtered = filtered.filter(client => client.riskProfile === riskProfileFilter);
    }

    // Drift filter
    if (driftFilter !== 'All') {
      filtered = filtered.filter(client => client.driftColor === driftFilter);
    }

    // Sorting
    filtered.sort((a, b) => {
      let comparison = 0;

      switch (sortField) {
        case 'name':
          comparison = a.fullName.localeCompare(b.fullName);
          break;
        case 'drift':
          comparison = a.drift - b.drift;
          break;
        case 'lastReview':
          comparison = new Date(a.lastReviewDate).getTime() - new Date(b.lastReviewDate).getTime();
          break;
      }

      return sortDirection === 'asc' ? comparison : -comparison;
    });

    return filtered;
  }, [clientData, searchTerm, riskProfileFilter, driftFilter, sortField, sortDirection]);

  if (user?.role === 'Compliance Officer') {
    return <ComplianceDashboard />;
  }

  const handleSort = (field: typeof sortField) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const getStatusBadge = (status: ProposalStatus) => {
    const color = statusColors[status] || statusColors.Draft;

    return (
      <span
        className="px-2 py-1 text-xs font-medium"
        style={{ backgroundColor: color.bg, color: color.text, fontFamily: 'var(--font-body)' }}
      >
        {status}
      </span>
    );
  };

  const getDriftBadge = (driftColor: 'Green' | 'Amber' | 'Red', drift: number) => {
    const color = statusColors[driftColor];

    return (
      <div className="flex items-center gap-2">
        <div className="size-2 rounded-full" style={{ backgroundColor: color.text }} />
        <span className="font-medium" style={{ color: color.text }}>
          {drift.toFixed(1)}%
        </span>
      </div>
    );
  };

  return (
    <div className="p-8">
      <div className="max-w-[1400px] mx-auto">
        {/* Success Message */}
        {successMessage && (
          <div className="mb-6 p-4 border flex items-center justify-between" style={{ backgroundColor: '#E3F2ED', borderColor: 'var(--color-secondary)' }}>
            <div className="flex items-center gap-3">
              <CheckCircle className="size-5" style={{ color: 'var(--color-secondary)' }} />
              <span className="text-sm font-medium" style={{ color: 'var(--color-secondary)', fontFamily: 'var(--font-body)' }}>
                {successMessage}
              </span>
            </div>
            <button
              onClick={() => setSuccessMessage('')}
              className="p-1 transition-opacity hover:opacity-70"
              style={{ color: 'var(--color-secondary)' }}
            >
              <X className="size-4" />
            </button>
          </div>
        )}

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl mb-1" style={{ color: 'var(--color-foreground)', fontFamily: 'var(--font-heading)' }}>
              Client Portfolio Dashboard
            </h1>
            <p className="text-sm" style={{ color: 'var(--color-muted-foreground)', fontFamily: 'var(--font-body)' }}>
              Last updated: {lastUpdated}
            </p>
          </div>
          <button
            className="flex items-center gap-2 px-4 py-2 border transition-all hover:bg-opacity-5"
            style={{
              borderColor: 'var(--color-border)',
              backgroundColor: 'var(--color-card)',
              color: 'var(--color-foreground)',
              fontFamily: 'var(--font-body)'
            }}
            onClick={() => window.location.reload()}
          >
            <RefreshCw className="size-4" />
            Refresh Data
          </button>
        </div>

        {/* Filters */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4" style={{ color: 'var(--color-muted-foreground)' }} />
            <input
              type="text"
              placeholder="Search by client name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border"
              style={{
                borderColor: 'var(--color-border)',
                backgroundColor: 'var(--color-input-background)',
                color: 'var(--color-foreground)'
              }}
            />
          </div>

          <select
            value={riskProfileFilter}
            onChange={(e) => setRiskProfileFilter(e.target.value as RiskProfile | 'All')}
            className="px-4 py-2 rounded-lg border"
            style={{
              borderColor: 'var(--color-border)',
              backgroundColor: 'var(--color-input-background)',
              color: 'var(--color-foreground)'
            }}
          >
            <option value="All">All Risk Profiles</option>
            <option value="Conservative">Conservative</option>
            <option value="Moderate">Moderate</option>
            <option value="Aggressive">Aggressive</option>
          </select>

          <select
            value={driftFilter}
            onChange={(e) => setDriftFilter(e.target.value as 'All' | 'Green' | 'Amber' | 'Red')}
            className="px-4 py-2 rounded-lg border"
            style={{
              borderColor: 'var(--color-border)',
              backgroundColor: 'var(--color-input-background)',
              color: 'var(--color-foreground)'
            }}
          >
            <option value="All">All Drift Levels</option>
            <option value="Green">Green (≤ 5%)</option>
            <option value="Amber">Amber (5-10%)</option>
            <option value="Red">Red (&gt; 10%)</option>
          </select>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total Clients', value: clientData.length, color: 'var(--color-primary)', bg: '#E3F2ED' },
            { label: 'Critical Drift', value: clientData.filter(c => c.driftColor === 'Red').length, color: '#8B4513', bg: '#F5E6D3' },
            { label: 'Pending Review', value: clientData.filter(c => c.proposalStatus === 'Compliance Review').length, color: '#8B6914', bg: '#FFF4E5' },
            { label: 'Approved', value: clientData.filter(c => c.proposalStatus === 'Approved').length, color: 'var(--color-secondary)', bg: '#E3F2ED' }
          ].map((card) => (
            <div
              key={card.label}
              className="p-6 border-l-4 transition-shadow hover:shadow-md"
              style={{
                borderLeftColor: card.color,
                borderTop: '1px solid var(--color-border)',
                borderRight: '1px solid var(--color-border)',
                borderBottom: '1px solid var(--color-border)',
                backgroundColor: card.bg
              }}
            >
              <p className="text-sm mb-2" style={{ color: 'var(--color-muted-foreground)', fontFamily: 'var(--font-body)' }}>
                {card.label}
              </p>
              <p className="text-3xl font-medium" style={{ color: card.color, fontFamily: 'var(--font-heading)' }}>
                {card.value}
              </p>
            </div>
          ))}
        </div>

        {/* Data Table */}
        <div className="border overflow-hidden shadow-sm" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-card)' }}>
          <table className="w-full">
            <thead>
              <tr style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-primary-foreground)' }}>
                <th className="text-left px-4 py-3">
                  <button
                    className="flex items-center gap-2 font-medium text-sm"
                    style={{ color: 'var(--color-primary-foreground)', fontFamily: 'var(--font-body)' }}
                    onClick={() => handleSort('name')}
                  >
                    Client Name
                    <ArrowUpDown className="size-3" />
                  </button>
                </th>
                <th className="text-left px-4 py-3">
                  <span className="font-medium text-sm" style={{ color: 'var(--color-primary-foreground)', fontFamily: 'var(--font-body)' }}>
                    Risk Profile
                  </span>
                </th>
                <th className="text-left px-4 py-3">
                  <button
                    className="flex items-center gap-2 font-medium text-sm"
                    style={{ color: 'var(--color-primary-foreground)', fontFamily: 'var(--font-body)' }}
                    onClick={() => handleSort('drift')}
                  >
                    Portfolio Drift
                    <ArrowUpDown className="size-3" />
                  </button>
                </th>
                <th className="text-left px-4 py-3">
                  <button
                    className="flex items-center gap-2 font-medium text-sm"
                    style={{ color: 'var(--color-primary-foreground)', fontFamily: 'var(--font-body)' }}
                    onClick={() => handleSort('lastReview')}
                  >
                    Last Review
                    <ArrowUpDown className="size-3" />
                  </button>
                </th>
                <th className="text-left px-4 py-3">
                  <span className="font-medium text-sm" style={{ color: 'var(--color-primary-foreground)', fontFamily: 'var(--font-body)' }}>
                    Proposal Status
                  </span>
                </th>
                <th className="text-right px-4 py-3">
                  <span className="font-medium text-sm" style={{ color: 'var(--color-primary-foreground)', fontFamily: 'var(--font-body)' }}>
                    Actions
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedData.map((client, index) => (
                <tr
                  key={client.clientId}
                  className="border-t"
                  style={{ borderColor: 'var(--color-border)' }}
                >
                  <td className="px-4 py-3">
                    <Link
                      to={`/portfolio/${client.clientId}`}
                      className="font-medium hover:underline"
                      style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-body)' }}
                    >
                      {client.fullName}
                    </Link>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm" style={{ color: 'var(--color-foreground)', fontFamily: 'var(--font-body)' }}>
                      {client.riskProfile}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {getDriftBadge(client.driftColor, client.drift)}
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm" style={{ color: 'var(--color-foreground)', fontFamily: 'var(--font-body)' }}>
                      {new Date(client.lastReviewDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {getStatusBadge(client.proposalStatus)}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        to={`/portfolio/${client.clientId}`}
                        className="px-3 py-2 border text-sm font-medium transition-all hover:bg-opacity-5"
                        style={{
                          borderColor: 'var(--color-border)',
                          backgroundColor: 'var(--color-card)',
                          color: 'var(--color-foreground)',
                          fontFamily: 'var(--font-body)'
                        }}
                      >
                        View Details
                      </Link>
                      {(client.proposalStatus === 'No Active Proposal' || client.proposalStatus === 'Approved' || client.proposalStatus === 'Rejected') && (
                        <Link
                          to={`/proposal/new/${client.clientId}`}
                          className="flex items-center gap-2 px-3 py-2 text-sm font-medium transition-opacity hover:opacity-90"
                          style={{
                            backgroundColor: 'var(--color-primary)',
                            color: 'var(--color-primary-foreground)',
                            fontFamily: 'var(--font-body)'
                          }}
                        >
                          <Plus className="size-4" />
                          Create Proposal
                        </Link>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Drift Legend */}
        <div className="mt-6 p-4 border-l-4" style={{ borderLeftColor: 'var(--color-primary)', backgroundColor: 'var(--color-muted)', borderTop: '1px solid var(--color-border)', borderRight: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
          <p className="text-sm font-medium mb-3" style={{ color: 'var(--color-foreground)', fontFamily: 'var(--font-body)' }}>
            Portfolio Drift Levels
          </p>
          <div className="flex items-center gap-8 text-sm">
            <div className="flex items-center gap-2">
              <div className="size-3" style={{ backgroundColor: '#2D8031' }} />
              <span style={{ color: 'var(--color-foreground)', fontFamily: 'var(--font-body)' }}>Green: ≤ 5% (On Track)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="size-3" style={{ backgroundColor: '#D4A259' }} />
              <span style={{ color: 'var(--color-foreground)', fontFamily: 'var(--font-body)' }}>Amber: 5-10% (Monitor)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="size-3" style={{ backgroundColor: '#8B4513' }} />
              <span style={{ color: 'var(--color-foreground)', fontFamily: 'var(--font-body)' }}>Critical: &gt; 10% (Action Required)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
