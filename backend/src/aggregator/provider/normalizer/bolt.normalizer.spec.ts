import { Test, TestingModule } from '@nestjs/testing';
import {
  AGGREGATOR_CONSTANTS,
  AggregatorConstants,
  AggregatorConstantsProvider,
} from '../../constants/constants.provider';
import { CarType, PriceType, ProviderType } from '../../types';
import { BoltRideInformation } from '../bolt.provider';
import { BoltNormalizer } from './bolt.normalizer';

describe('BoltNormalizer', () => {
  let normalizer: BoltNormalizer;
  let constants: AggregatorConstants;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BoltNormalizer, AggregatorConstantsProvider],
    }).compile();

    normalizer = module.get<BoltNormalizer>(BoltNormalizer);
    constants = module.get<AggregatorConstants>(AGGREGATOR_CONSTANTS);
  });

  it('normalizes the Bolt specific information', () => {
    const option: BoltRideInformation = {
      duration: 25,
      price: {
        low: 18,
        high: 36,
      },
      vehicleType: 'station_wagon',
    };

    const result = normalizer.normalize([option]);

    expect(result).toStrictEqual(
      expect.arrayContaining([
        expect.objectContaining({
          carType: CarType.Large,
          currency: constants.currency,
          price: { high: 36, low: 18, type: PriceType.Range },
          provider: ProviderType.Bolt,
          durationMinutes: 25,
        }),
      ]),
    );
  });
});
