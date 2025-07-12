export class ServiceException extends Error {
  code: number;
  constructor(
    message: string = "Service exception occurred",
    code: number = 500
  ) {
    super(message);
    this.name = "ServiceException";
    this.code = code;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
