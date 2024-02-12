import { Inject, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import {
  AGGREGATOR_CONSTANTS,
  AggregatorConstants,
} from '../../constants/constants.provider';
import { CarType, PriceType, ProviderType, RideInformation } from '../../types';
import { UberCarType, UberRideInformation } from '../uber.provider';
import { Normalizer } from './interface/normalizer.interface';

@Injectable()
export class UberNormalizer implements Normalizer<UberRideInformation> {
  constructor(
    @Inject(AGGREGATOR_CONSTANTS)
    private readonly constants: AggregatorConstants,
  ) {}

  mapCarType(type: UberCarType): CarType {
    switch (type) {
      case 'normal':
        return CarType.Eco;
      case 'premium':
        return CarType.Luxurious;
      case 'extra':
        return CarType.Large;
    }
  }

  normalize(options: UberRideInformation[]): RideInformation[] {
    return options.map((o) => ({
      id: randomUUID(),
      provider: ProviderType.Uber,
      currency: this.constants.currency,
      carType: this.mapCarType(o.carType),
      durationMinutes: Math.floor(o.durationSeconds / 60),
      price: {
        type: PriceType.Fixed,
        fixed: o.price,
      },
    }));
  }
}
