// TrustN Status Colors - No red per brand guidelines

export const statusColors = {
  // Proposal Status
  Draft: { bg: 'var(--color-muted)', text: 'var(--color-muted-foreground)' },
  Submitted: { bg: '#E3F2ED', text: '#115740' },
  'Compliance Review': { bg: '#FFF4E5', text: '#8B6914' },
  Approved: { bg: '#E3F2ED', text: '#2D8031' },
  Rejected: { bg: '#F5E6D3', text: '#8B4513' }, // Brown instead of red
  'No Active Proposal': { bg: 'var(--color-muted)', text: 'var(--color-muted-foreground)' },

  // Drift Colors
  Green: { bg: '#E3F2ED', text: '#2D8031' },
  Amber: { bg: '#FFF4E5', text: '#D4A259' },
  Red: { bg: '#F5E6D3', text: '#8B4513' }, // Brown instead of red

  // Suitability
  Pass: { bg: '#E3F2ED', text: '#2D8031' },
  'Pass with Warnings': { bg: '#FFF4E5', text: '#D4A259' },
  Fail: { bg: '#F5E6D3', text: '#8B4513' }, // Brown instead of red

  // Severity
  Critical: { bg: '#F5E6D3', text: '#8B4513', border: '#D4A259' }, // Brown instead of red
  Warning: { bg: '#FFF4E5', text: '#8B6914', border: '#D4A259' },
  Success: { bg: '#E3F2ED', text: '#2D8031', border: '#2D8031' }
};
