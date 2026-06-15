import { clientsService } from '../services/clients.service.js';

export const ClientsController = {
  async getRebalancingStatus(req, res, next) {
    try {
      const result = await clientsService.getRebalancingStatus(req.body, req.params, req.query);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
};
