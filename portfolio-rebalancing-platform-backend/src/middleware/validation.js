import Joi from 'joi';
import { logger } from '../utils/logger.js';

export const validate = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true
    });

    if (error) {
      logger.warn('Validation failed:', error.details);
      return res.status(400).json({
        error: 'Validation Error',
        details: error.details.map(d => ({
          field: d.path.join('.'),
          message: d.message
        }))
      });
    }

    req.body = value;
    next();
  };
};

// Common validation schemas
export const schemas = {
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  id: Joi.string().uuid().required()
};
