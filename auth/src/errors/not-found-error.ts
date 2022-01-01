import { CustomError } from './custom-error';

export class NotfoundError extends CustomError {
  statusCode = 404;

  constructor() {
    super('Route not found');

    // Only because we are extending a built in class
    Object.setPrototypeOf(this, NotfoundError.prototype);
  }

  serializeErrors() {
    return [{ message: 'Not found' }];
  }
}
