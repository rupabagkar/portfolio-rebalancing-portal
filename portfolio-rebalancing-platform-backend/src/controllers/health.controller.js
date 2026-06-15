import { healthService } from '../services/health.service.js';

export const HealthController = {
  async get(req, res, next) {
    try {
      const result = await healthService.get(req.body, req.params, req.query);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
};
