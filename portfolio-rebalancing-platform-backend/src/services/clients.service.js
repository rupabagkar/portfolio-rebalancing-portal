export const clientsService = {
  async getRebalancingStatus(body, params, query) {
    const clients = [
      {
        id: 'CL-001',
        name: 'Sarah Thompson',
        ticker: 'SARAH-T',
        value: 500000,
        portfolioDrift: 2.3,
        timeHorizonYears: 15,
        lastReview: '2025-03-15',
        riskProfile: 'Moderate',
        status: 'Active'
      },
      {
        id: 'CL-002',
        name: 'Michael Chen',
        ticker: 'MICHAEL-C',
        value: 750000,
        portfolioDrift: -1.5,
        timeHorizonYears: 25,
        lastReview: '2025-04-20',
        riskProfile: 'Aggressive',
        status: 'Active'
      },
      {
        id: 'CL-003',
        name: 'Jennifer Williams',
        ticker: 'JENNIFER-W',
        value: 350000,
        portfolioDrift: 5.1,
        timeHorizonYears: 8,
        lastReview: '2025-03-28',
        riskProfile: 'Conservative',
        status: 'Active'
      },
      {
        id: 'CL-004',
        name: 'Robert Martinez',
        ticker: 'ROBERT-M',
        value: 620000,
        portfolioDrift: 3.8,
        timeHorizonYears: 20,
        lastReview: '2025-04-10',
        riskProfile: 'Moderate',
        status: 'Active'
      }
    ];

    return {
      success: true,
      data: clients,
      count: clients.length,
      timestamp: new Date().toISOString()
    };
  }
};
