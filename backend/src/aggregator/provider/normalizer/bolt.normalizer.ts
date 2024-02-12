import { Inject, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import {
  AGGREGATOR_CONSTANTS,
  AggregatorConstants,
} from '../../constants/constants.provider';
import { CarType, PriceType, ProviderType, RideInformation } from '../../types';
import { BoltRideInformation, BoltVehicleType } from '../bolt.provider';
import { Normalizer } from './interface/normalizer.interface';

@Injectable()
export class BoltNormalizer implements Normalizer<BoltRideInformation> {
  constructor(
    @Inject(AGGREGATOR_CONSTANTS)
    private readonly constants: AggregatorConstants,
  ) {}

  mapVehicleTypeToCarType(type: BoltVehicleType): CarType {
    switch (type) {
      case 'eco':
        return CarType.Eco;
      case 'luxurious':
        return CarType.Luxurious;
      case 'station_wagon':
        return CarType.Large;
    }
  }

  normalize(options: BoltRideInformation[]): RideInformation[] {
    return options.map((o) => ({
      id: randomUUID(),
      provider: ProviderType.Bolt,
      currency: this.constants.currency,
      price: {
        type: PriceType.Range,
        low: o.price.low,
        high: o.price.high,
      },
      carType: this.mapVehicleTypeToCarType(o.vehicleType),
      durationMinutes: o.duration,
    }));
  }
}
