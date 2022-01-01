import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

import { RequestValidationError } from '../errors/request-validation-error';
import { DatabaseConnectionError } from '../errors/database-connection-error';

const router = express.Router();

router.get(
  '/api/users/signup',
  [
    body('email').isEmail().withMessage('Provide a valid email'),
    body('password')
      .trim()
      .isLength({ min: 6, max: 20 })
      .withMessage('Password must be between 6 and 20 characters'),
  ],
  async (req: Request, res: Response) => {
    // handle validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }

    const { email, password } = req.body;
    console.log('Creating a user...');
    throw new DatabaseConnectionError();

    res.send({});
  }
);

export { router as signupRouter };
