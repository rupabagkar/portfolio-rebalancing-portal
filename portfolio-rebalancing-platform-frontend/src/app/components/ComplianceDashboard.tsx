import { useState } from 'react';
import { Link } from 'react-router';
import { Shield, Clock, CheckCircle, XCircle, AlertTriangle, BookOpen, TrendingUp, Bell, ChevronRight, ArrowUpDown } from 'lucide-react';
import { statusColors } from '../../utils/statusColors';
import { mockProposals, mockClients, mockAdvisors, mockComplianceRules } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';

const marketNews = [
  {
    id: 'NEWS-001',
    category: 'SEC Update',
    headline: 'SEC Proposes Enhanced Disclosure Requirements for ESG Funds',
    summary: 'New rules would require investment advisers to provide standardized ESG disclosures. Comment period closes June 30, 2025.',
    date: '2025-05-19',
    impact: 'High'
  },
  {
    id: 'NEWS-002',
    category: 'FINRA Notice',
    headline: 'FINRA Regulatory Notice 25-08: Suitability Obligations Update',
    summary: "Reg BI suitability obligations now extend to digital advice platforms. Firms must review client profiling methodologies by Q3 2025.",
    date: '2025-05-16',
    impact: 'High'
  },
  {
    id: 'NEWS-003',
    category: 'Market Alert',
    headline: 'Fed Holds Rates: Revised Fixed Income Threshold Guidance Expected',
    summary: 'Federal Reserve holds rates steady; compliance teams should review fixed income allocation thresholds given prolonged rate environment.',
    date: '2025-05-14',
    impact: 'Medium'
  },
  {
    id: 'NEWS-004',
    category: 'DOL Rule',
    headline: 'DOL Fiduciary Rule Implementation: Q3 Compliance Deadline',
    summary: 'Retirement account advice fiduciary standards take effect July 1. Advisors managing IRA rollovers must document best-interest analysis.',
    date: '2025-05-10',
    impact: 'High'
  },
  {
    id: 'NEWS-005',
    category: 'Industry Guidance',
    headline: 'NASAA Issues Model Rule on Senior Investor Protections',
    summary: 'Updated model rule expands protections for investors aged 65+. Review Conservative risk profile thresholds for senior clients.',
    date: '2025-05-08',
    impact: 'Medium'
  }
];

type ProposalFilter = 'All' | 'Pending' | 'Approved' | 'Rejected';

export function ComplianceDashboard() {
  const { user } = useAuth();
  const [proposalFilter, setProposalFilter] = useState<ProposalFilter>('All');
  const [sortField, setSortField] = useState<'submitted' | 'client'>('submitted');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  const pendingCount = mockProposals.filter(p => p.status === 'Compliance Review').length;
  const approvedCount = mockProposals.filter(p => p.status === 'Approved').length;
  const rejectedCount = mockProposals.filter(p => p.status === 'Rejected').length;
  const activeRulesCount = mockComplianceRules.filter(r => r.isActive).length;

  const filteredProposals = mockProposals
    .filter(p => {
      if (proposalFilter === 'Pending') return p.status === 'Compliance Review';
      if (proposalFilter === 'Approved') return p.status === 'Approved';
      if (proposalFilter === 'Rejected') return p.status === 'Rejected';
      return true;
    })
    .sort((a, b) => {
      if (sortField === 'client') {
        const nameA = mockClients.find(c => c.clientId === a.clientId)?.fullName || '';
        const nameB = mockClients.find(c => c.clientId === b.clientId)?.fullName || '';
        return sortDir === 'asc' ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
      }
      const dateA = new Date(a.submittedAt || a.createdAt).getTime();
      const dateB = new Date(b.submittedAt || b.createdAt).getTime();
      return sortDir === 'asc' ? dateA - dateB : dateB - dateA;
    });

  const handleSort = (field: typeof sortField) => {
    if (sortField === field) {
      setSortDir(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDir('desc');
    }
  };

  const getStatusBadge = (status: string) => {
    const color = statusColors[status as keyof typeof statusColors] || statusColors.Draft;
    const Icon = status === 'Approved' ? CheckCircle : status === 'Rejected' ? XCircle : Clock;
    return (
      <span
        className="inline-flex items-center gap-1.5 px-2 py-1 text-xs font-medium"
        style={{ backgroundColor: color.bg, color: color.text, fontFamily: 'var(--font-body)' }}
      >
        <Icon className="size-3" />
        {status === 'Compliance Review' ? 'Pending Review' : status}
      </span>
    );
  };

  const getSuitabilityBadge = (result?: { overall: string }) => {
    if (!result) return <span className="text-xs" style={{ color: 'var(--color-muted-foreground)', fontFamily: 'var(--font-body)' }}>—</span>;
    const color = statusColors[result.overall as keyof typeof statusColors];
    if (!color) return null;
    const Icon = result.overall === 'Pass' ? CheckCircle : result.overall === 'Fail' ? XCircle : AlertTriangle;
    return (
      <span
        className="inline-flex items-center gap-1 px-1.5 py-0.5 text-xs font-medium"
        style={{ backgroundColor: color.bg, color: color.text, fontFamily: 'var(--font-body)' }}
      >
        <Icon className="size-3" />
        {result.overall}
      </span>
    );
  };

  const getImpactStyle = (impact: string) => {
    if (impact === 'High') return { backgroundColor: '#F5E6D3', color: '#8B4513' };
    return { backgroundColor: '#FFF4E5', color: '#8B6914' };
  };

  const filterTabs: { key: ProposalFilter; label: string; count: number }[] = [
    { key: 'All', label: 'All Proposals', count: mockProposals.length },
    { key: 'Pending', label: 'Pending Review', count: pendingCount },
    { key: 'Approved', label: 'Approved', count: approvedCount },
    { key: 'Rejected', label: 'Rejected', count: rejectedCount },
  ];

  return (
    <div className="p-8" style={{ fontFamily: 'var(--font-body)' }}>
      <div className="max-w-[1600px] mx-auto">

        {/* Page Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 style={{ color: 'var(--color-foreground)', fontFamily: 'var(--font-heading)', fontSize: 'var(--text-2xl)', fontWeight: 'var(--font-weight-medium)', marginBottom: '0.25rem' }}>
              Compliance Dashboard
            </h1>
            <p style={{ color: 'var(--color-muted-foreground)', fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)' }}>
              Welcome back, {user?.fullName} · {today}
            </p>
          </div>
          <Link
            to="/compliance"
            className="flex items-center gap-2 px-4 py-2 transition-opacity hover:opacity-90"
            style={{
              backgroundColor: 'var(--color-primary)',
              color: 'var(--color-primary-foreground)',
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-sm)',
              fontWeight: 'var(--font-weight-medium)'
            }}
          >
            <Shield className="size-4" />
            Open Review Queue
          </Link>
        </div>

        {/* Summary Stats Cards */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          {[
            {
              label: 'Pending Review',
              value: pendingCount,
              icon: Clock,
              borderColor: '#D4A259',
              bg: '#FFF4E5',
              valueColor: '#8B6914',
              note: 'Requires action'
            },
            {
              label: 'Approved',
              value: approvedCount,
              icon: CheckCircle,
              borderColor: 'var(--color-secondary)',
              bg: '#E3F2ED',
              valueColor: 'var(--color-secondary)',
              note: 'Total approved'
            },
            {
              label: 'Rejected',
              value: rejectedCount,
              icon: XCircle,
              borderColor: 'var(--color-critical)',
              bg: '#F5E6D3',
              valueColor: 'var(--color-critical)',
              note: 'Total rejected'
            },
            {
              label: 'Active Rules',
              value: activeRulesCount,
              icon: BookOpen,
              borderColor: 'var(--color-primary)',
              bg: '#E3F2ED',
              valueColor: 'var(--color-primary)',
              note: 'Suitability rules'
            }
          ].map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.label}
                className="p-6 border-l-4"
                style={{
                  borderLeftColor: card.borderColor,
                  borderTop: '1px solid var(--color-border)',
                  borderRight: '1px solid var(--color-border)',
                  borderBottom: '1px solid var(--color-border)',
                  backgroundColor: card.bg
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <p style={{ color: 'var(--color-muted-foreground)', fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)' }}>
                    {card.label}
                  </p>
                  <Icon className="size-4" style={{ color: card.valueColor, opacity: 0.7 }} />
                </div>
                <p style={{ color: card.valueColor, fontFamily: 'var(--font-heading)', fontSize: 'var(--text-3xl)', fontWeight: 'var(--font-weight-medium)', lineHeight: 1 }}>
                  {card.value}
                </p>
                <p className="mt-2" style={{ color: 'var(--color-muted-foreground)', fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)' }}>
                  {card.note}
                </p>
              </div>
            );
          })}
        </div>

        {/* Main Content: Proposals Table + Right Sidebar */}
        <div className="flex gap-6">

          {/* Left: Proposals Table */}
          <div className="flex-1 min-w-0">
            <div className="border shadow-sm" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-card)' }}>
              {/* Table Header */}
              <div className="px-6 py-4 border-b flex items-center justify-between" style={{ backgroundColor: 'var(--color-primary)', borderColor: 'var(--color-primary)' }}>
                <h2 style={{ color: 'var(--color-primary-foreground)', fontFamily: 'var(--font-heading)', fontSize: 'var(--text-lg)', fontWeight: 'var(--font-weight-medium)' }}>
                  Proposal Status Overview
                </h2>
                <span style={{ color: 'var(--color-primary-foreground)', fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', opacity: 0.8 }}>
                  View-only — proposals managed by advisors
                </span>
              </div>

              {/* Filter Tabs */}
              <div className="flex border-b" style={{ borderColor: 'var(--color-border)' }}>
                {filterTabs.map(tab => (
                  <button
                    key={tab.key}
                    onClick={() => setProposalFilter(tab.key)}
                    className="px-5 py-3 border-b-2 transition-colors flex items-center gap-2"
                    style={{
                      borderColor: proposalFilter === tab.key ? 'var(--color-primary)' : 'transparent',
                      color: proposalFilter === tab.key ? 'var(--color-primary)' : 'var(--color-muted-foreground)',
                      backgroundColor: proposalFilter === tab.key ? 'rgba(17,87,64,0.04)' : 'transparent',
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--text-sm)',
                      fontWeight: proposalFilter === tab.key ? 'var(--font-weight-medium)' : 'var(--font-weight-normal)'
                    }}
                  >
                    {tab.label}
                    <span
                      className="px-1.5 py-0.5 text-xs font-medium"
                      style={{
                        backgroundColor: proposalFilter === tab.key ? 'var(--color-primary)' : 'var(--color-border)',
                        color: proposalFilter === tab.key ? 'var(--color-primary-foreground)' : 'var(--color-muted-foreground)',
                        fontFamily: 'var(--font-body)'
                      }}
                    >
                      {tab.count}
                    </span>
                  </button>
                ))}
              </div>

              {/* Table */}
              <table className="w-full">
                <thead>
                  <tr style={{ backgroundColor: 'var(--color-muted)' }}>
                    <th className="text-left px-4 py-3">
                      <button
                        className="flex items-center gap-1.5 text-xs font-medium"
                        style={{ color: 'var(--color-muted-foreground)', fontFamily: 'var(--font-body)' }}
                        onClick={() => handleSort('client')}
                      >
                        Client <ArrowUpDown className="size-3" />
                      </button>
                    </th>
                    <th className="text-left px-4 py-3">
                      <span className="text-xs font-medium" style={{ color: 'var(--color-muted-foreground)', fontFamily: 'var(--font-body)' }}>
                        Proposal ID
                      </span>
                    </th>
                    <th className="text-left px-4 py-3">
                      <span className="text-xs font-medium" style={{ color: 'var(--color-muted-foreground)', fontFamily: 'var(--font-body)' }}>
                        Advisor
                      </span>
                    </th>
                    <th className="text-left px-4 py-3">
                      <button
                        className="flex items-center gap-1.5 text-xs font-medium"
                        style={{ color: 'var(--color-muted-foreground)', fontFamily: 'var(--font-body)' }}
                        onClick={() => handleSort('submitted')}
                      >
                        Submitted <ArrowUpDown className="size-3" />
                      </button>
                    </th>
                    <th className="text-left px-4 py-3">
                      <span className="text-xs font-medium" style={{ color: 'var(--color-muted-foreground)', fontFamily: 'var(--font-body)' }}>
                        Suitability
                      </span>
                    </th>
                    <th className="text-left px-4 py-3">
                      <span className="text-xs font-medium" style={{ color: 'var(--color-muted-foreground)', fontFamily: 'var(--font-body)' }}>
                        Status
                      </span>
                    </th>
                    <th className="text-right px-4 py-3">
                      <span className="text-xs font-medium" style={{ color: 'var(--color-muted-foreground)', fontFamily: 'var(--font-body)' }}>
                        Action
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProposals.map((proposal) => {
                    const client = mockClients.find(c => c.clientId === proposal.clientId);
                    const advisorName = mockAdvisors[proposal.advisorId] || proposal.advisorId;
                    return (
                      <tr
                        key={proposal.proposalId}
                        className="border-t"
                        style={{ borderColor: 'var(--color-border)' }}
                      >
                        <td className="px-4 py-3">
                          <p className="text-sm font-medium" style={{ color: 'var(--color-foreground)', fontFamily: 'var(--font-body)' }}>
                            {client?.fullName}
                          </p>
                          <p className="text-xs" style={{ color: 'var(--color-muted-foreground)', fontFamily: 'var(--font-body)' }}>
                            {client?.riskProfile}
                          </p>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-xs font-mono" style={{ color: 'var(--color-muted-foreground)' }}>
                            {proposal.proposalId}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-sm" style={{ color: 'var(--color-foreground)', fontFamily: 'var(--font-body)' }}>
                            {advisorName}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-sm" style={{ color: 'var(--color-foreground)', fontFamily: 'var(--font-body)' }}>
                            {new Date(proposal.submittedAt || proposal.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          {getSuitabilityBadge(proposal.suitabilityResult)}
                        </td>
                        <td className="px-4 py-3">
                          {getStatusBadge(proposal.status)}
                        </td>
                        <td className="px-4 py-3 text-right">
                          {proposal.status === 'Compliance Review' ? (
                            <Link
                              to="/compliance"
                              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium transition-opacity hover:opacity-90"
                              style={{
                                backgroundColor: 'var(--color-primary)',
                                color: 'var(--color-primary-foreground)',
                                fontFamily: 'var(--font-body)'
                              }}
                            >
                              Review
                              <ChevronRight className="size-3" />
                            </Link>
                          ) : (
                            <Link
                              to={`/proposal/${proposal.proposalId}`}
                              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium border transition-colors hover:bg-muted"
                              style={{
                                borderColor: 'var(--color-border)',
                                color: 'var(--color-foreground)',
                                fontFamily: 'var(--font-body)'
                              }}
                            >
                              View
                              <ChevronRight className="size-3" />
                            </Link>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                  {filteredProposals.length === 0 && (
                    <tr>
                      <td colSpan={7} className="px-4 py-16 text-center">
                        <p style={{ color: 'var(--color-muted-foreground)', fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)' }}>
                          No proposals in this category.
                        </p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="w-80 flex-shrink-0 flex flex-col gap-6">

            {/* Active Compliance Rules */}
            <div className="border shadow-sm" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-card)' }}>
              <div className="px-4 py-3 border-b flex items-center gap-2" style={{ backgroundColor: 'var(--color-primary)', borderColor: 'var(--color-primary)' }}>
                <BookOpen className="size-4" style={{ color: 'var(--color-primary-foreground)' }} />
                <h3 style={{ color: 'var(--color-primary-foreground)', fontFamily: 'var(--font-heading)', fontSize: 'var(--text-base)', fontWeight: 'var(--font-weight-medium)' }}>
                  Active Compliance Rules
                </h3>
              </div>
              <div className="divide-y" style={{ borderColor: 'var(--color-border)' }}>
                {mockComplianceRules.filter(r => r.isActive).map(rule => (
                  <div key={rule.ruleId} className="px-4 py-3">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <p className="text-xs font-medium leading-snug" style={{ color: 'var(--color-foreground)', fontFamily: 'var(--font-body)' }}>
                        {rule.ruleName}
                      </p>
                      <span
                        className="flex-shrink-0 px-1.5 py-0.5 text-xs font-medium"
                        style={
                          rule.severity === 'Critical'
                            ? { backgroundColor: '#F5E6D3', color: '#8B4513', fontFamily: 'var(--font-body)' }
                            : { backgroundColor: '#FFF4E5', color: '#8B6914', fontFamily: 'var(--font-body)' }
                        }
                      >
                        {rule.severity}
                      </span>
                    </div>
                    <p className="text-xs" style={{ color: 'var(--color-muted-foreground)', fontFamily: 'var(--font-body)' }}>
                      {rule.riskProfileTarget} · {rule.assetClass} · {rule.operator === 'max' ? 'Max' : 'Min'} {rule.thresholdPct}%
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Regulatory & Market News */}
            <div className="border shadow-sm" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-card)' }}>
              <div className="px-4 py-3 border-b flex items-center gap-2" style={{ backgroundColor: 'var(--color-primary)', borderColor: 'var(--color-primary)' }}>
                <TrendingUp className="size-4" style={{ color: 'var(--color-primary-foreground)' }} />
                <h3 style={{ color: 'var(--color-primary-foreground)', fontFamily: 'var(--font-heading)', fontSize: 'var(--text-base)', fontWeight: 'var(--font-weight-medium)' }}>
                  Regulatory & Market News
                </h3>
              </div>
              <div className="divide-y" style={{ borderColor: 'var(--color-border)' }}>
                {marketNews.map(news => (
                  <div key={news.id} className="px-4 py-3">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span
                        className="px-1.5 py-0.5 text-xs font-medium"
                        style={{ backgroundColor: 'var(--color-muted)', color: 'var(--color-muted-foreground)', fontFamily: 'var(--font-body)' }}
                      >
                        {news.category}
                      </span>
                      <span
                        className="px-1.5 py-0.5 text-xs font-medium flex items-center gap-1"
                        style={{ ...getImpactStyle(news.impact), fontFamily: 'var(--font-body)' }}
                      >
                        <Bell className="size-2.5" />
                        {news.impact} Impact
                      </span>
                    </div>
                    <p className="text-xs font-medium mb-1 leading-snug" style={{ color: 'var(--color-foreground)', fontFamily: 'var(--font-body)' }}>
                      {news.headline}
                    </p>
                    <p className="text-xs leading-relaxed" style={{ color: 'var(--color-muted-foreground)', fontFamily: 'var(--font-body)' }}>
                      {news.summary}
                    </p>
                    <p className="text-xs mt-1" style={{ color: 'var(--color-muted-foreground)', fontFamily: 'var(--font-body)', opacity: 0.7 }}>
                      {new Date(news.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
