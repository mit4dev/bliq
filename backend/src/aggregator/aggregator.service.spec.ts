import { Test, TestingModule } from '@nestjs/testing';
import { UtilsModule } from '../utils/utils.module';
import { AggregatorService } from './aggregator.service';
import { AggregatorConstantsProvider } from './constants/constants.provider';
import { BoltProvider } from './provider/bolt.provider';
import { BoltNormalizer } from './provider/normalizer/bolt.normalizer';
import { UberNormalizer } from './provider/normalizer/uber.normalizer';
import { UberProvider } from './provider/uber.provider';
import { SorterService } from './sorter/sorter.service';

describe('AggregatorService', () => {
  let service: AggregatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UtilsModule],
      providers: [
        AggregatorConstantsProvider,
        AggregatorService,
        UberProvider,
        BoltProvider,
        SorterService,
        UberNormalizer,
        BoltNormalizer,
      ],
    }).compile();

    service = module.get<AggregatorService>(AggregatorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
