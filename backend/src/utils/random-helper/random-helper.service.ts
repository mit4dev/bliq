import { Injectable } from '@nestjs/common';

@Injectable()
export class RandomHelperService {
  integer(min: number, max: number): number {
    // It might be good idea to validate inputs against different cases, however,
    // I am ignoring them for the sake of simplicity

    // Copied from: https://stackoverflow.com/a/7228322/4698361
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
