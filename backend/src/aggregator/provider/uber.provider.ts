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
import { UberNormalizer } from './normalizer/uber.normalizer';

export type UberCarType = 'normal' | 'premium' | 'extra';
export type UberRideInformation = {
  durationSeconds: number;
  carType: UberCarType;
  price: number;
};

@Injectable()
export class UberProvider implements Provider {
  constructor(
    private readonly normalizer: UberNormalizer,
    @Inject(AGGREGATOR_CONSTANTS)
    private readonly constants: AggregatorConstants,
    private readonly randomHelper: RandomHelperService,
    private readonly sleepHelper: SleepHelperService,
    private readonly errorRaiseHelper: ErrorRaiseHelperService,
  ) {}

  private getRandomVehicleType(): UberCarType {
    const types = ['normal', 'premium', 'extra'] satisfies UberCarType[];

    const randomIndex = Math.floor(Math.random() * types.length);

    return types[randomIndex];
  }

  private generate(): UberRideInformation[] {
    const {
      optionsFetchRange: { min, max },
    } = this.constants.provider;

    const numOptionsToGenerate = this.randomHelper.integer(min, max);

    return [...Array(numOptionsToGenerate)].map(() => ({
      durationSeconds: this.randomHelper.integer(25, 30) * 60,
      price: this.randomHelper.integer(15, 40),
      carType: this.getRandomVehicleType(),
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
