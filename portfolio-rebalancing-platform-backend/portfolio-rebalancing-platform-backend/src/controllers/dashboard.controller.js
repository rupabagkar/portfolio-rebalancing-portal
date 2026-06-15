import { dashboardService } from '../services/dashboard.service.js';

export const DashboardController = {
  async getStats(req, res, next) {
    try {
      const result = await dashboardService.getStats(req.body, req.params, req.query);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
};
