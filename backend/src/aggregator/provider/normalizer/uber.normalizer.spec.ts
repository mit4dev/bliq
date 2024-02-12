import { Test, TestingModule } from '@nestjs/testing';
import {
  AGGREGATOR_CONSTANTS,
  AggregatorConstants,
  AggregatorConstantsProvider,
} from '../../constants/constants.provider';
import { CarType, PriceType, ProviderType } from '../../types';
import { UberRideInformation } from '../uber.provider';
import { UberNormalizer } from './uber.normalizer';

describe('UberNormalizer', () => {
  let normalizer: UberNormalizer;
  let constants: AggregatorConstants;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UberNormalizer, AggregatorConstantsProvider],
    }).compile();

    normalizer = module.get<UberNormalizer>(UberNormalizer);
    constants = module.get<AggregatorConstants>(AGGREGATOR_CONSTANTS);
  });

  it('normalizes the Bolt specific information', () => {
    const option: UberRideInformation = {
      durationSeconds: 1800,
      price: 45,
      carType: 'premium',
    };

    const result = normalizer.normalize([option]);

    expect(result).toStrictEqual(
      expect.arrayContaining([
        expect.objectContaining({
          carType: CarType.Luxurious,
          currency: constants.currency,
          price: { fixed: 45, type: PriceType.Fixed },
          provider: ProviderType.Uber,
          durationMinutes: 30,
        }),
      ]),
    );
  });
});
