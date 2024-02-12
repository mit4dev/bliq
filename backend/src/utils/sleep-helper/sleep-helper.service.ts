import { Injectable } from '@nestjs/common';

@Injectable()
export class SleepHelperService {
  sleep(timeoutMs: number): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(), timeoutMs);
    });
  }
}
