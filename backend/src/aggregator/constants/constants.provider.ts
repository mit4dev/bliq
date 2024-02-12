import { Provider } from '@nestjs/common';
import { Currency } from '../types';

// Following provider definition is to demonstrate the more idiomatic way to use of constants in the NestJS context. (PS: I know they are not actual 'constants' but you get the point)
// Also could've been defined using env vars via injecting the ConfigService to this provider

export const AGGREGATOR_CONSTANTS = 'AGGREGATOR_CONSTANTS';
export type AggregatorConstants = {
  /**
   * ISO 4217 code of the currency currently being used in the app.
   */
  currency: Currency;

  provider: {
    /**
     * Floating number value indicates the simulated error rate per provider request.
     * Must be between 0 and 1, both inclusive
     *
     * @example
     * errorRate: 0.25 // 25% error chance
     * errorRate: 0.1 // 10% error chance
     */
    errorRate: number;

    /**
     * Indicates number of ride options will be randomly fetched/generated per provider request.
     */
    optionsFetchRange: { min: number; max: number };

    /**
     * Indicates the random duration per provider request takes, in milliseconds.
     */
    requestDurationRange: { min: number; max: number };
  };
};

export const AggregatorConstantsProvider: Provider<AggregatorConstants> = {
  provide: AGGREGATOR_CONSTANTS,
  useValue: {
    currency: Currency.EUR,
    provider: {
      errorRate: 0.4,
      optionsFetchRange: { min: 2, max: 5 },
      requestDurationRange: { min: 1000, max: 2000 },
    },
  },
};
