import { useParams, Link, useNavigate } from 'react-router';
import { ArrowLeft, Download, Plus, TrendingUp, Target } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useAuth } from '../../context/AuthContext';
import {
  mockClients,
  mockHoldings,
  mockProposals,
  mockAdvisors,
  calculateDrift,
  getDriftColor,
  type Holding
} from '../../data/mockData';

export function PortfolioDetail() {
  const { user } = useAuth();
  const { clientId } = useParams<{ clientId: string }>();
  const navigate = useNavigate();

  const client = mockClients.find(c => c.clientId === clientId);
  const holdings = mockHoldings.filter(h => h.clientId === clientId);
  const proposals = mockProposals.filter(p => p.clientId === clientId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  if (!client) {
    return (
      <div className="p-8">
        <div className="text-center" style={{ color: 'var(--color-muted-foreground)' }}>
          Client not found
        </div>
      </div>
    );
  }

  const drift = calculateDrift(holdings);
  const driftColor = getDriftColor(drift);
  const totalValue = holdings.reduce((sum, h) => sum + h.currentValue, 0);

  // Aggregate holdings by asset class for chart
  const assetClassData = holdings.reduce((acc, holding) => {
    const existing = acc.find(item => item.assetClass === holding.assetClass);
    if (existing) {
      existing.current += holding.currentAllocationPct;
      existing.target += holding.targetAllocationPct;
    } else {
      acc.push({
        assetClass: holding.assetClass,
        current: holding.currentAllocationPct,
        target: holding.targetAllocationPct
      });
    }
    return acc;
  }, [] as Array<{ assetClass: string; current: number; target: number; }>);

  const handleDownloadCSV = () => {
    const headers = ['Asset Class', 'Security Name', 'Ticker', 'Quantity', 'Current Value', 'Current %', 'Target %'];
    const rows = holdings.map(h => [
      h.assetClass,
      h.securityName,
      h.ticker,
      h.quantity.toString(),
      `$${h.currentValue.toLocaleString()}`,
      `${h.currentAllocationPct.toFixed(2)}%`,
      `${h.targetAllocationPct.toFixed(2)}%`
    ]);

    const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${client.fullName.replace(/\s+/g, '_')}_holdings.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getDriftBadge = () => {
    const colors = {
      Green: { bg: '#dcfce7', text: '#166534' },
      Amber: { bg: '#fef3c7', text: '#92400e' },
      Red: { bg: '#fee2e2', text: '#991b1b' }
    };

    const color = colors[driftColor];

    return (
      <div className="flex items-center gap-2">
        <div className="size-3 rounded-full" style={{ backgroundColor: color.text }} />
        <span className="text-lg font-medium" style={{ color: color.text }}>
          {drift.toFixed(1)}% Drift
        </span>
      </div>
    );
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      'Draft': { bg: 'var(--color-muted)', text: 'var(--color-muted-foreground)' },
      'Submitted': { bg: '#e0f2fe', text: '#0369a1' },
      'Compliance Review': { bg: '#fef3c7', text: '#92400e' },
      'Approved': { bg: '#dcfce7', text: '#166534' },
      'Rejected': { bg: '#fee2e2', text: '#991b1b' }
    };

    const color = colors[status as keyof typeof colors] || { bg: 'var(--color-muted)', text: 'var(--color-muted-foreground)' };

    return (
      <span
        className="px-2 py-1 rounded text-xs font-medium"
        style={{ backgroundColor: color.bg, color: color.text }}
      >
        {status}
      </span>
    );
  };

  return (
    <div className="p-8">
      <div className="max-w-[1400px] mx-auto">
        {/* Back Navigation */}
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 mb-6 hover:underline"
          style={{ color: 'var(--color-primary)' }}
        >
          <ArrowLeft className="size-4" />
          Back to Dashboard
        </button>

        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-2xl font-medium mb-2" style={{ color: 'var(--color-foreground)' }}>
              {client.fullName}
            </h1>
            <div className="flex items-center gap-4 text-sm">
              <span style={{ color: 'var(--color-muted-foreground)' }}>
                Client ID: {client.clientId}
              </span>
              <span style={{ color: 'var(--color-muted-foreground)' }}>•</span>
              <span style={{ color: 'var(--color-muted-foreground)' }}>
                Last Review: {new Date(client.lastReviewDate).toLocaleDateString()}
              </span>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleDownloadCSV}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border"
              style={{
                borderColor: 'var(--color-border)',
                backgroundColor: 'var(--color-card)',
                color: 'var(--color-foreground)'
              }}
            >
              <Download className="size-4" />
              Export CSV
            </button>
            <Link
              to={`/proposal/new/${client.clientId}`}
              className="flex items-center gap-2 px-4 py-2 rounded-lg"
              style={{
                backgroundColor: 'var(--color-primary)',
                color: 'var(--color-primary-foreground)'
              }}
            >
              <Plus className="size-4" />
              New Proposal
            </Link>
          </div>
        </div>

        {/* Client Profile Card */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="rounded-lg border p-4" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-card)' }}>
            <div className="flex items-center gap-2 mb-2">
              <Target className="size-4" style={{ color: 'var(--color-primary)' }} />
              <span className="text-sm font-medium" style={{ color: 'var(--color-foreground)' }}>
                Risk Profile
              </span>
            </div>
            <p className="text-xl font-medium" style={{ color: 'var(--color-foreground)' }}>
              {client.riskProfile}
            </p>
          </div>

          <div className="rounded-lg border p-4" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-card)' }}>
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="size-4" style={{ color: 'var(--color-primary)' }} />
              <span className="text-sm font-medium" style={{ color: 'var(--color-foreground)' }}>
                Portfolio Value
              </span>
            </div>
            <p className="text-xl font-medium" style={{ color: 'var(--color-foreground)' }}>
              ${totalValue.toLocaleString()}
            </p>
          </div>

          <div className="rounded-lg border p-4" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-card)' }}>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-medium" style={{ color: 'var(--color-foreground)' }}>
                Current Drift
              </span>
            </div>
            {getDriftBadge()}
          </div>
        </div>

        {/* Investment Profile */}
        <div className="rounded-lg border p-4 mb-6" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-card)' }}>
          <h3 className="font-medium mb-3" style={{ color: 'var(--color-foreground)' }}>
            Investment Profile
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm mb-1" style={{ color: 'var(--color-muted-foreground)' }}>
                Investment Goals
              </p>
              <p className="text-sm" style={{ color: 'var(--color-foreground)' }}>
                {client.investmentGoals}
              </p>
            </div>
            <div>
              <p className="text-sm mb-1" style={{ color: 'var(--color-muted-foreground)' }}>
                Time Horizon
              </p>
              <p className="text-sm" style={{ color: 'var(--color-foreground)' }}>
                {client.timeHorizon} years
              </p>
            </div>
          </div>
        </div>

        {/* Allocation Chart */}
        <div className="rounded-lg border p-6 mb-6" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-card)' }}>
          <h3 className="font-medium mb-4" style={{ color: 'var(--color-foreground)' }}>
            Asset Allocation: Current vs Target
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={assetClassData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="assetClass" tick={{ fill: 'var(--color-foreground)', fontSize: 12 }} />
              <YAxis tick={{ fill: 'var(--color-foreground)', fontSize: 12 }} label={{ value: '%', angle: -90, position: 'insideLeft', fill: 'var(--color-foreground)' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--color-card)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px',
                  color: 'var(--color-foreground)'
                }}
              />
              <Legend wrapperStyle={{ color: 'var(--color-foreground)' }} />
              <Bar dataKey="current" fill="#0369a1" name="Current %" />
              <Bar dataKey="target" fill="#166534" name="Target %" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Holdings Table */}
        <div className="rounded-lg border overflow-hidden mb-6" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-card)' }}>
          <div className="p-4 border-b" style={{ borderColor: 'var(--color-border)' }}>
            <h3 className="font-medium" style={{ color: 'var(--color-foreground)' }}>
              Current Holdings
            </h3>
          </div>
          <table className="w-full">
            <thead>
              <tr style={{ backgroundColor: 'var(--color-muted)' }}>
                <th className="text-left px-4 py-3 text-sm font-medium" style={{ color: 'var(--color-foreground)' }}>Asset Class</th>
                <th className="text-left px-4 py-3 text-sm font-medium" style={{ color: 'var(--color-foreground)' }}>Security Name</th>
                <th className="text-left px-4 py-3 text-sm font-medium" style={{ color: 'var(--color-foreground)' }}>Ticker</th>
                <th className="text-right px-4 py-3 text-sm font-medium" style={{ color: 'var(--color-foreground)' }}>Quantity</th>
                <th className="text-right px-4 py-3 text-sm font-medium" style={{ color: 'var(--color-foreground)' }}>Market Value</th>
                <th className="text-right px-4 py-3 text-sm font-medium" style={{ color: 'var(--color-foreground)' }}>Current %</th>
                <th className="text-right px-4 py-3 text-sm font-medium" style={{ color: 'var(--color-foreground)' }}>Target %</th>
              </tr>
            </thead>
            <tbody>
              {holdings.map((holding, index) => (
                <tr
                  key={holding.holdingId}
                  className="border-t"
                  style={{ borderColor: 'var(--color-border)' }}
                >
                  <td className="px-4 py-3 text-sm" style={{ color: 'var(--color-foreground)' }}>{holding.assetClass}</td>
                  <td className="px-4 py-3 text-sm" style={{ color: 'var(--color-foreground)' }}>{holding.securityName}</td>
                  <td className="px-4 py-3 text-sm font-mono" style={{ color: 'var(--color-muted-foreground)' }}>{holding.ticker}</td>
                  <td className="px-4 py-3 text-sm text-right" style={{ color: 'var(--color-foreground)' }}>{holding.quantity.toLocaleString()}</td>
                  <td className="px-4 py-3 text-sm text-right font-medium" style={{ color: 'var(--color-foreground)' }}>
                    ${holding.currentValue.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-sm text-right" style={{ color: 'var(--color-foreground)' }}>
                    {holding.currentAllocationPct.toFixed(1)}%
                  </td>
                  <td className="px-4 py-3 text-sm text-right" style={{ color: 'var(--color-foreground)' }}>
                    {holding.targetAllocationPct.toFixed(1)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Proposal History */}
        <div className="rounded-lg border overflow-hidden" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-card)' }}>
          <div className="p-4 border-b" style={{ borderColor: 'var(--color-border)' }}>
            <h3 className="font-medium" style={{ color: 'var(--color-foreground)' }}>
              Proposal History
            </h3>
          </div>
          {proposals.length > 0 ? (
            <table className="w-full">
              <thead>
                <tr style={{ backgroundColor: 'var(--color-muted)' }}>
                  <th className="text-left px-4 py-3 text-sm font-medium" style={{ color: 'var(--color-foreground)' }}>Proposal ID</th>
                  <th className="text-left px-4 py-3 text-sm font-medium" style={{ color: 'var(--color-foreground)' }}>Created Date</th>
                  <th className="text-left px-4 py-3 text-sm font-medium" style={{ color: 'var(--color-foreground)' }}>Status</th>
                  <th className="text-left px-4 py-3 text-sm font-medium" style={{ color: 'var(--color-foreground)' }}>Advisor</th>
                  <th className="text-right px-4 py-3 text-sm font-medium" style={{ color: 'var(--color-foreground)' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {proposals.map(proposal => (
                  <tr
                    key={proposal.proposalId}
                    className="border-t"
                    style={{ borderColor: 'var(--color-border)' }}
                  >
                    <td className="px-4 py-3 text-sm font-mono" style={{ color: 'var(--color-primary)' }}>
                      {proposal.proposalId}
                    </td>
                    <td className="px-4 py-3 text-sm" style={{ color: 'var(--color-foreground)' }}>
                      {new Date(proposal.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </td>
                    <td className="px-4 py-3">
                      {getStatusBadge(proposal.status)}
                    </td>
                    <td className="px-4 py-3 text-sm" style={{ color: 'var(--color-foreground)' }}>
                      {mockAdvisors[proposal.advisorId] || user?.fullName || 'Unknown'}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Link
                        to={`/proposal/${proposal.proposalId}`}
                        className="px-3 py-1.5 rounded-lg border text-sm font-medium"
                        style={{
                          borderColor: 'var(--color-border)',
                          backgroundColor: 'var(--color-card)',
                          color: 'var(--color-foreground)'
                        }}
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="p-8 text-center" style={{ color: 'var(--color-muted-foreground)' }}>
              No proposal history available
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
