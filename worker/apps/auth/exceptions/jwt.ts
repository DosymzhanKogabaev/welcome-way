import { ServiceException } from '@/worker/apps/common/exceptions';

export class InvalidOrExpiredTokenException extends ServiceException {
  constructor(message: string = 'Invalid or expired token') {
    super(message, 401);
    this.name = 'InvalidOrExpiredTokenException';
  }
}

export class NotCorrectTokenTypeException extends ServiceException {
  constructor(message: string = 'Not correct token type') {
    super(message, 401);
    this.name = 'NotCorrectTokenTypeException';
  }
}

export class InvalidTokenPayloadException extends ServiceException {
  constructor(message: string = 'Invalid token payload') {
    super(message, 401);
    this.name = 'InvalidTokenPayloadException';
  }
}
