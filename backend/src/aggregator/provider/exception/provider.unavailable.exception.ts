import { BadGatewayException } from '@nestjs/common';
import { ProviderType } from '../../types';

// Information: following exception is not used anywhere.
// Custom exception example.
// It's also good to have a base exception that holds certain information
// such as time, cause, resource code (to let frontend display specific messages) along with the extra information provided by the sub-classes
// and then creating a NestJs ExceptionFilter to catch and transform the final response.

export class ProviderUnavailableException extends BadGatewayException {
  constructor(provider: ProviderType) {
    super({ provider });
  }
}
