import { auditService } from '../services/audit.service.js';

export const AuditController = {
  async getLogs(req, res, next) {
    try {
      const result = await auditService.getLogs(req.body, req.params, req.query);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
};
