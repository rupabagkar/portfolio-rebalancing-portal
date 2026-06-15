import { authService } from '../services/auth.service.js';

export const AuthController = {
  async postLogin(req, res, next) {
    try {
      const result = await authService.postLogin(req.body, req.params, req.query);
      res.json(result);
    } catch (error) {
      next(error);
    }
  },

  async postRegister(req, res, next) {
    try {
      const result = await authService.postRegister(req.body, req.params, req.query);
      res.json(result);
    } catch (error) {
      next(error);
    }
  },

  async postLogout(req, res, next) {
    try {
      const result = await authService.postLogout(req.body, req.params, req.query);
      res.json(result);
    } catch (error) {
      next(error);
    }
  },

  async getMe(req, res, next) {
    try {
      const result = await authService.getMe(req.body, req.params, req.query);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
};
