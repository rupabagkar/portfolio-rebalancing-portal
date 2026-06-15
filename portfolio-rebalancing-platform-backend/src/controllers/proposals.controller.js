import { proposalsService } from '../services/proposals.service.js';

export const ProposalsController = {
  async get(req, res, next) {
    try {
      const result = await proposalsService.get(req.body, req.params, req.query);
      res.json(result);
    } catch (error) {
      next(error);
    }
  },

  async putProposalIdApprove(req, res, next) {
    try {
      const result = await proposalsService.putProposalIdApprove(req.body, req.params, req.query);
      res.json(result);
    } catch (error) {
      next(error);
    }
  },

  async getProposalId(req, res, next) {
    try {
      const result = await proposalsService.getProposalId(req.body, req.params, req.query);
      res.json(result);
    } catch (error) {
      next(error);
    }
  },

  async post(req, res, next) {
    try {
      const result = await proposalsService.post(req.body, req.params, req.query);
      res.json(result);
    } catch (error) {
      next(error);
    }
  },

  async putProposalId(req, res, next) {
    try {
      const result = await proposalsService.putProposalId(req.body, req.params, req.query);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
};
