// Mock data for the Portfolio Rebalancing Platform

export type RiskProfile = 'Conservative' | 'Moderate' | 'Aggressive' | 'Custom';

export type ProposalStatus = 'Draft' | 'Submitted' | 'Compliance Review' | 'Approved' | 'Rejected' | 'No Active Proposal';

export interface Client {
  clientId: string;
  fullName: string;
  riskProfile: RiskProfile;
  investmentGoals: string;
  timeHorizon: number;
  assignedAdvisorId: string;
  lastReviewDate: string;
}

export interface Holding {
  holdingId: string;
  clientId: string;
  assetClass: string;
  securityName: string;
  ticker: string;
  quantity: number;
  currentValue: number;
  currentAllocationPct: number;
  targetAllocationPct: number;
}

export interface Proposal {
  proposalId: string;
  clientId: string;
  advisorId: string;
  status: ProposalStatus;
  version: number;
  createdAt: string;
  submittedAt?: string;
  resolvedAt?: string;
  notes: string;
  allocations: Record<string, number>;
  suitabilityResult?: SuitabilityResult;
  complianceComment?: string;
  aiSummary?: string;
}

export interface SuitabilityResult {
  overall: 'Pass' | 'Fail' | 'Pass with Warnings';
  violations: Array<{
    ruleId: string;
    severity: 'Critical' | 'Warning';
    description: string;
  }>;
}

export interface ComplianceRule {
  ruleId: string;
  ruleName: string;
  riskProfileTarget: RiskProfile;
  assetClass: string;
  operator: 'min' | 'max';
  thresholdPct: number;
  severity: 'Critical' | 'Warning';
  isActive: boolean;
}

export interface AuditLogEntry {
  logId: string;
  timestampUtc: string;
  userId: string;
  userRole: string;
  actionType: string;
  entityType: string;
  entityId: string;
  previousState?: string;
  newState?: string;
  sourceIp: string;
  sessionId: string;
}

// Mock Clients
export const mockClients: Client[] = [
  {
    clientId: 'CL-001',
    fullName: 'Sarah Thompson',
    riskProfile: 'Moderate',
    investmentGoals: 'Retirement planning with balanced growth and income',
    timeHorizon: 15,
    assignedAdvisorId: 'ADV-001',
    lastReviewDate: '2025-03-15'
  },
  {
    clientId: 'CL-002',
    fullName: 'Michael Chen',
    riskProfile: 'Aggressive',
    investmentGoals: 'Long-term capital appreciation',
    timeHorizon: 25,
    assignedAdvisorId: 'ADV-001',
    lastReviewDate: '2025-04-20'
  },
  {
    clientId: 'CL-003',
    fullName: 'Jennifer Martinez',
    riskProfile: 'Conservative',
    investmentGoals: 'Capital preservation with modest income',
    timeHorizon: 8,
    assignedAdvisorId: 'ADV-001',
    lastReviewDate: '2025-05-01'
  },
  {
    clientId: 'CL-004',
    fullName: 'Robert Johnson',
    riskProfile: 'Moderate',
    investmentGoals: 'Wealth accumulation for family education',
    timeHorizon: 12,
    assignedAdvisorId: 'ADV-001',
    lastReviewDate: '2025-02-28'
  },
  {
    clientId: 'CL-005',
    fullName: 'Emily Davis',
    riskProfile: 'Aggressive',
    investmentGoals: 'Maximum growth potential',
    timeHorizon: 30,
    assignedAdvisorId: 'ADV-001',
    lastReviewDate: '2025-05-10'
  },
  {
    clientId: 'CL-006',
    fullName: 'David Wilson',
    riskProfile: 'Conservative',
    investmentGoals: 'Pre-retirement income generation',
    timeHorizon: 5,
    assignedAdvisorId: 'ADV-001',
    lastReviewDate: '2025-04-15'
  }
];

// Mock Holdings
export const mockHoldings: Holding[] = [
  // Sarah Thompson (CL-001) - Moderate, 12% drift
  { holdingId: 'H-001', clientId: 'CL-001', assetClass: 'Equities', securityName: 'S&P 500 Index Fund', ticker: 'SPY', quantity: 150, currentValue: 67500, currentAllocationPct: 52.0, targetAllocationPct: 60.0 },
  { holdingId: 'H-002', clientId: 'CL-001', assetClass: 'Fixed Income', securityName: 'US Treasury Bonds', ticker: 'TLT', quantity: 300, currentValue: 30000, targetAllocationPct: 30.0, currentAllocationPct: 23.1 },
  { holdingId: 'H-003', clientId: 'CL-001', assetClass: 'Cash', securityName: 'Money Market Fund', ticker: 'VMFXX', quantity: 15000, currentValue: 15000, currentAllocationPct: 11.5, targetAllocationPct: 5.0 },
  { holdingId: 'H-004', clientId: 'CL-001', assetClass: 'Alternatives', securityName: 'Real Estate Investment Trust', ticker: 'VNQ', quantity: 100, currentValue: 17500, currentAllocationPct: 13.5, targetAllocationPct: 5.0 },

  // Michael Chen (CL-002) - Aggressive, 3% drift
  { holdingId: 'H-005', clientId: 'CL-002', assetClass: 'Equities', securityName: 'Growth Stock ETF', ticker: 'VUG', quantity: 400, currentValue: 112000, currentAllocationPct: 82.0, targetAllocationPct: 85.0 },
  { holdingId: 'H-006', clientId: 'CL-002', assetClass: 'Fixed Income', securityName: 'Corporate Bonds', ticker: 'LQD', quantity: 150, currentValue: 16500, currentAllocationPct: 12.1, targetAllocationPct: 10.0 },
  { holdingId: 'H-007', clientId: 'CL-002', assetClass: 'Cash', securityName: 'Money Market Fund', ticker: 'VMFXX', quantity: 8000, currentValue: 8000, currentAllocationPct: 5.9, targetAllocationPct: 5.0 },

  // Jennifer Martinez (CL-003) - Conservative, 15% drift (RED)
  { holdingId: 'H-008', clientId: 'CL-003', assetClass: 'Equities', securityName: 'Dividend Stock ETF', ticker: 'VYM', quantity: 200, currentValue: 42000, currentAllocationPct: 45.0, targetAllocationPct: 30.0 },
  { holdingId: 'H-009', clientId: 'CL-003', assetClass: 'Fixed Income', securityName: 'Municipal Bonds', ticker: 'MUB', quantity: 250, currentValue: 27500, currentAllocationPct: 29.5, targetAllocationPct: 55.0 },
  { holdingId: 'H-010', clientId: 'CL-003', assetClass: 'Cash', securityName: 'Money Market Fund', ticker: 'VMFXX', quantity: 24000, currentValue: 24000, currentAllocationPct: 25.7, targetAllocationPct: 15.0 },

  // Robert Johnson (CL-004) - Moderate, 7% drift
  { holdingId: 'H-011', clientId: 'CL-004', assetClass: 'Equities', securityName: 'Total Market Index', ticker: 'VTI', quantity: 250, currentValue: 57500, currentAllocationPct: 53.0, targetAllocationPct: 60.0 },
  { holdingId: 'H-012', clientId: 'CL-004', assetClass: 'Fixed Income', securityName: 'Aggregate Bond Fund', ticker: 'AGG', quantity: 350, currentValue: 35000, currentAllocationPct: 32.3, targetAllocationPct: 30.0 },
  { holdingId: 'H-013', clientId: 'CL-004', assetClass: 'Cash', securityName: 'Money Market Fund', ticker: 'VMFXX', quantity: 16000, currentValue: 16000, currentAllocationPct: 14.8, targetAllocationPct: 10.0 },

  // Emily Davis (CL-005) - Aggressive, 2% drift
  { holdingId: 'H-014', clientId: 'CL-005', assetClass: 'Equities', securityName: 'Tech Sector ETF', ticker: 'XLK', quantity: 300, currentValue: 93000, currentAllocationPct: 87.0, targetAllocationPct: 85.0 },
  { holdingId: 'H-015', clientId: 'CL-005', assetClass: 'Fixed Income', securityName: 'High-Yield Bonds', ticker: 'HYG', quantity: 120, currentValue: 10800, currentAllocationPct: 10.1, targetAllocationPct: 10.0 },
  { holdingId: 'H-016', clientId: 'CL-005', assetClass: 'Cash', securityName: 'Money Market Fund', ticker: 'VMFXX', quantity: 3100, currentValue: 3100, currentAllocationPct: 2.9, targetAllocationPct: 5.0 },

  // David Wilson (CL-006) - Conservative, 8% drift
  { holdingId: 'H-017', clientId: 'CL-006', assetClass: 'Equities', securityName: 'Value Stock ETF', ticker: 'VTV', quantity: 180, currentValue: 36000, currentAllocationPct: 38.0, targetAllocationPct: 30.0 },
  { holdingId: 'H-018', clientId: 'CL-006', assetClass: 'Fixed Income', securityName: 'Treasury Inflation-Protected Securities', ticker: 'TIP', quantity: 280, currentValue: 33600, currentAllocationPct: 35.5, targetAllocationPct: 55.0 },
  { holdingId: 'H-019', clientId: 'CL-006', assetClass: 'Cash', securityName: 'Money Market Fund', ticker: 'VMFXX', quantity: 25000, currentValue: 25000, currentAllocationPct: 26.4, targetAllocationPct: 15.0 },
];

// Mock Proposals - from multiple advisors
export const mockProposals: Proposal[] = [
  {
    proposalId: 'PROP-20250515-0001',
    clientId: 'CL-001',
    advisorId: 'ADV-001',
    status: 'Compliance Review',
    version: 2,
    createdAt: '2025-05-15T10:30:00Z',
    submittedAt: '2025-05-15T14:20:00Z',
    notes: 'Client requested rebalancing to align with target allocation after market rally. Adjusting equity exposure down and increasing fixed income.',
    allocations: {
      'Equities': 60.0,
      'Fixed Income': 30.0,
      'Cash': 5.0,
      'Alternatives': 5.0
    },
    suitabilityResult: {
      overall: 'Pass',
      violations: []
    }
  },
  {
    proposalId: 'PROP-20250510-0002',
    clientId: 'CL-003',
    advisorId: 'ADV-001',
    status: 'Draft',
    version: 1,
    createdAt: '2025-05-18T09:15:00Z',
    notes: 'Working on reducing equity overweight and increasing bond allocation.',
    allocations: {
      'Equities': 35.0,
      'Fixed Income': 50.0,
      'Cash': 15.0
    }
  },
  {
    proposalId: 'PROP-20250501-0003',
    clientId: 'CL-004',
    advisorId: 'ADV-001',
    status: 'Approved',
    version: 1,
    createdAt: '2025-05-01T11:00:00Z',
    submittedAt: '2025-05-01T15:30:00Z',
    resolvedAt: '2025-05-02T09:45:00Z',
    notes: 'Quarterly rebalancing per client agreement.',
    allocations: {
      'Equities': 60.0,
      'Fixed Income': 30.0,
      'Cash': 10.0
    },
    suitabilityResult: {
      overall: 'Pass',
      violations: []
    },
    complianceComment: 'Proposal approved. Allocations align with client risk profile and investment objectives.',
    aiSummary: 'Dear Robert,\n\nFollowing our recent portfolio review, we recommend rebalancing your investment portfolio to better align with your Moderate risk profile and wealth accumulation goals for family education over the next 12 years.\n\nThe proposed changes will increase your bond allocation to 30%, reducing equity exposure to 60%, and maintaining 10% in cash. This adjustment will help manage volatility while preserving your growth objectives.\n\nBest regards,\nYour Wealth Advisory Team'
  },
  {
    proposalId: 'PROP-20250517-0004',
    clientId: 'CL-002',
    advisorId: 'ADV-002',
    status: 'Compliance Review',
    version: 1,
    createdAt: '2025-05-17T13:00:00Z',
    submittedAt: '2025-05-17T16:45:00Z',
    notes: 'Annual review - client wants to increase growth allocation given long time horizon.',
    allocations: {
      'Equities': 85.0,
      'Fixed Income': 10.0,
      'Cash': 5.0
    },
    suitabilityResult: {
      overall: 'Pass',
      violations: []
    }
  },
  {
    proposalId: 'PROP-20250516-0005',
    clientId: 'CL-005',
    advisorId: 'ADV-003',
    status: 'Compliance Review',
    version: 1,
    createdAt: '2025-05-16T09:30:00Z',
    submittedAt: '2025-05-16T11:15:00Z',
    notes: 'Rebalancing after significant tech sector gains. Moving to target allocation.',
    allocations: {
      'Equities': 85.0,
      'Fixed Income': 10.0,
      'Cash': 5.0
    },
    suitabilityResult: {
      overall: 'Pass with Warnings',
      violations: [
        {
          ruleId: 'RULE-006',
          severity: 'Warning',
          description: 'Cash allocation (5.0%) is at minimum threshold of 2.0% for Aggressive risk profile - consider maintaining higher liquidity'
        }
      ]
    }
  },
  {
    proposalId: 'PROP-20250514-0006',
    clientId: 'CL-006',
    advisorId: 'ADV-002',
    status: 'Rejected',
    version: 1,
    createdAt: '2025-05-14T10:00:00Z',
    submittedAt: '2025-05-14T14:30:00Z',
    resolvedAt: '2025-05-15T09:00:00Z',
    notes: 'Client wants more aggressive allocation approaching retirement.',
    allocations: {
      'Equities': 45.0,
      'Fixed Income': 40.0,
      'Cash': 15.0
    },
    suitabilityResult: {
      overall: 'Pass',
      violations: []
    },
    complianceComment: 'Rejected - Client is 5 years from retirement with Conservative risk profile. The proposed 45% equity allocation exceeds our risk tolerance for this time horizon. Please discuss more appropriate allocation with client.'
  }
];

// Advisor information
export const mockAdvisors: Record<string, string> = {
  'ADV-001': 'Neo P',
  'ADV-002': 'Sarah Johnson',
  'ADV-003': 'Michael Rivera'
};

// Mock Compliance Rules
export const mockComplianceRules: ComplianceRule[] = [
  {
    ruleId: 'RULE-001',
    ruleName: 'Conservative - Maximum Equity Allocation',
    riskProfileTarget: 'Conservative',
    assetClass: 'Equities',
    operator: 'max',
    thresholdPct: 40.0,
    severity: 'Critical',
    isActive: true
  },
  {
    ruleId: 'RULE-002',
    ruleName: 'Conservative - Minimum Fixed Income Allocation',
    riskProfileTarget: 'Conservative',
    assetClass: 'Fixed Income',
    operator: 'min',
    thresholdPct: 45.0,
    severity: 'Critical',
    isActive: true
  },
  {
    ruleId: 'RULE-003',
    ruleName: 'Moderate - Maximum Equity Allocation',
    riskProfileTarget: 'Moderate',
    assetClass: 'Equities',
    operator: 'max',
    thresholdPct: 70.0,
    severity: 'Critical',
    isActive: true
  },
  {
    ruleId: 'RULE-004',
    ruleName: 'Moderate - Minimum Fixed Income Allocation',
    riskProfileTarget: 'Moderate',
    assetClass: 'Fixed Income',
    operator: 'min',
    thresholdPct: 20.0,
    severity: 'Warning',
    isActive: true
  },
  {
    ruleId: 'RULE-005',
    ruleName: 'Aggressive - Maximum Equity Allocation',
    riskProfileTarget: 'Aggressive',
    assetClass: 'Equities',
    operator: 'max',
    thresholdPct: 90.0,
    severity: 'Critical',
    isActive: true
  },
  {
    ruleId: 'RULE-006',
    ruleName: 'Aggressive - Minimum Cash Allocation',
    riskProfileTarget: 'Aggressive',
    assetClass: 'Cash',
    operator: 'min',
    thresholdPct: 2.0,
    severity: 'Warning',
    isActive: true
  }
];

// Mock Audit Log
export const mockAuditLog: AuditLogEntry[] = [
  {
    logId: 'LOG-001',
    timestampUtc: '2025-05-20T08:30:00Z',
    userId: 'ADV-001',
    userRole: 'Financial Advisor',
    actionType: 'LOGIN',
    entityType: 'SESSION',
    entityId: 'SESS-12345',
    sourceIp: '192.168.1.100',
    sessionId: 'SESS-12345'
  },
  {
    logId: 'LOG-002',
    timestampUtc: '2025-05-18T09:15:00Z',
    userId: 'ADV-001',
    userRole: 'Financial Advisor',
    actionType: 'PROPOSAL_CREATE',
    entityType: 'PROPOSAL',
    entityId: 'PROP-20250510-0002',
    newState: 'Draft',
    sourceIp: '192.168.1.100',
    sessionId: 'SESS-12344'
  },
  {
    logId: 'LOG-003',
    timestampUtc: '2025-05-15T14:20:00Z',
    userId: 'ADV-001',
    userRole: 'Financial Advisor',
    actionType: 'PROPOSAL_SUBMIT',
    entityType: 'PROPOSAL',
    entityId: 'PROP-20250515-0001',
    previousState: 'Draft',
    newState: 'Compliance Review',
    sourceIp: '192.168.1.100',
    sessionId: 'SESS-12343'
  },
  {
    logId: 'LOG-004',
    timestampUtc: '2025-05-02T09:45:00Z',
    userId: 'COMP-001',
    userRole: 'Compliance Officer',
    actionType: 'PROPOSAL_APPROVE',
    entityType: 'PROPOSAL',
    entityId: 'PROP-20250501-0003',
    previousState: 'Compliance Review',
    newState: 'Approved',
    sourceIp: '192.168.1.50',
    sessionId: 'SESS-12342'
  },
  {
    logId: 'LOG-005',
    timestampUtc: '2025-05-01T15:30:00Z',
    userId: 'ADV-001',
    userRole: 'Financial Advisor',
    actionType: 'PROPOSAL_SUBMIT',
    entityType: 'PROPOSAL',
    entityId: 'PROP-20250501-0003',
    previousState: 'Draft',
    newState: 'Compliance Review',
    sourceIp: '192.168.1.100',
    sessionId: 'SESS-12341'
  }
];

// Helper function to calculate portfolio drift
export function calculateDrift(holdings: Holding[]): number {
  const maxDrift = holdings.reduce((max, holding) => {
    const drift = Math.abs(holding.currentAllocationPct - holding.targetAllocationPct);
    return Math.max(max, drift);
  }, 0);
  return maxDrift;
}

// Helper function to get drift color based on thresholds
export function getDriftColor(drift: number): 'Green' | 'Amber' | 'Red' {
  if (drift <= 5) return 'Green';
  if (drift <= 10) return 'Amber';
  return 'Red';
}

// Helper function to get proposal status for a client
export function getClientProposalStatus(clientId: string): ProposalStatus {
  const clientProposals = mockProposals.filter(p => p.clientId === clientId);
  if (clientProposals.length === 0) return 'No Active Proposal';

  // Return the most recent non-approved/rejected proposal status
  const activeProposal = clientProposals.find(p =>
    p.status !== 'Approved' && p.status !== 'Rejected'
  );

  return activeProposal ? activeProposal.status : 'No Active Proposal';
}
