import { Test, TestingModule } from '@nestjs/testing';
import {
  CarType,
  Currency,
  PriceType,
  ProviderType,
  RideInformation,
} from '../types';
import { SorterService } from './sorter.service';

describe('SorterService', () => {
  let service: SorterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SorterService],
    }).compile();

    service = module.get<SorterService>(SorterService);
  });

  it('should sort ride options by average price asc - from low to high', () => {
    // Unordered data
    const data: RideInformation[] = [
      {
        // Highest (avg - 30)
        id: '1',
        provider: ProviderType.Bolt,
        carType: CarType.Eco,
        currency: Currency.EUR,
        durationMinutes: 25,
        price: {
          type: PriceType.Range,
          low: 25,
          high: 35,
        },
      },
      {
        // Lowest (avg - 25)
        id: '2',
        provider: ProviderType.Uber,
        carType: CarType.Eco,
        currency: Currency.EUR,
        durationMinutes: 25,
        price: {
          type: PriceType.Fixed,
          fixed: 25,
        },
      },
      {
        // Medium (avg - 27.5)
        id: '3',
        provider: ProviderType.Uber,
        carType: CarType.Eco,
        currency: Currency.EUR,
        durationMinutes: 25,
        price: {
          type: PriceType.Fixed,
          fixed: 27.5,
        },
      },
    ];

    const result = service.byAveragePriceAsc(data);

    expect(result).toStrictEqual(
      expect.arrayContaining([
        expect.objectContaining({
          price: expect.objectContaining({
            fixed: 25,
          }),
        }),
        expect.objectContaining({
          price: expect.objectContaining({
            fixed: 27.5,
          }),
        }),
        expect.objectContaining({
          price: expect.objectContaining({
            low: 25,
            high: 35,
          }),
        }),
      ]),
    );
  });
});
