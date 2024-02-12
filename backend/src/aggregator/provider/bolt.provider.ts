import { Inject, Injectable } from '@nestjs/common';
import { ErrorRaiseHelperService } from '../../utils/error-raise-helper/error-raise-helper.service';
import { RandomHelperService } from '../../utils/random-helper/random-helper.service';
import { SleepHelperService } from '../../utils/sleep-helper/sleep-helper.service';
import {
  AGGREGATOR_CONSTANTS,
  AggregatorConstants,
} from '../constants/constants.provider';
import { RideInformation } from '../types';
import { Provider } from './interface/provider.interface';
import { BoltNormalizer } from './normalizer/bolt.normalizer';

export type BoltVehicleType = 'eco' | 'luxurious' | 'station_wagon';
export type BoltRideInformation = {
  /**
   * Duration in minutes
   */
  duration: number;
  vehicleType: BoltVehicleType;
  price: {
    low: number;
    high: number;
  };
};

@Injectable()
export class BoltProvider implements Provider {
  constructor(
    private readonly normalizer: BoltNormalizer,
    @Inject(AGGREGATOR_CONSTANTS)
    private readonly constants: AggregatorConstants,
    private readonly randomHelper: RandomHelperService,
    private readonly sleepHelper: SleepHelperService,
    private readonly errorRaiseHelper: ErrorRaiseHelperService,
  ) {}

  private getRandomVehicleType(): BoltVehicleType {
    const types = [
      'eco',
      'luxurious',
      'station_wagon',
    ] satisfies BoltVehicleType[];

    const randomIndex = Math.floor(Math.random() * types.length);

    return types[randomIndex];
  }

  private generate(): BoltRideInformation[] {
    const {
      optionsFetchRange: { min, max },
    } = this.constants.provider;

    const numOptionsToGenerate = this.randomHelper.integer(min, max);

    return [...Array(numOptionsToGenerate)].map(() => ({
      duration: this.randomHelper.integer(25, 30),
      price: {
        low: this.randomHelper.integer(15, 20),
        high: this.randomHelper.integer(35, 40),
      },
      vehicleType: this.getRandomVehicleType(),
    }));
  }

  async getOptions(): Promise<RideInformation[]> {
    // Simulate async response time
    const {
      requestDurationRange: { min, max },
    } = this.constants.provider;
    const sleepDuration = this.randomHelper.integer(min, max);
    await this.sleepHelper.sleep(sleepDuration);

    // Simulate the occurrence of a provider error with a silent failure
    const { errorRate } = this.constants.provider;
    if (this.errorRaiseHelper.shouldError(errorRate)) {
      return [];
    }

    const rideOptions = this.generate();
    return this.normalizer.normalize(rideOptions);
  }
}
