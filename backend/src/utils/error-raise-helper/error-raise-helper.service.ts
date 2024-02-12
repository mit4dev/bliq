import { Injectable } from '@nestjs/common';

@Injectable()
export class ErrorRaiseHelperService {
  /**
   * Simulates error behavior specified by the input arg.
   * @param rate Number between 0 and 1
   */
  shouldError(rate: number): boolean {
    return rate >= Math.random();
  }
}
