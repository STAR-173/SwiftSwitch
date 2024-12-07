import { ApiError } from '../types/config';

export class EndpointError extends Error {
  constructor(message: string, public endpoint: string) {
    super(message);
    this.name = 'EndpointError';
  }

  toJSON(): ApiError {
    return {
      message: this.message,
      endpoint: this.endpoint,
    };
  }
}