import { Test, TestingModule } from '@nestjs/testing';
import { UtilsModule } from '../utils/utils.module';
import { AggregatorController } from './aggregator.controller';
import { AggregatorService } from './aggregator.service';
import { AggregatorConstantsProvider } from './constants/constants.provider';
import { BoltProvider } from './provider/bolt.provider';
import { BoltNormalizer } from './provider/normalizer/bolt.normalizer';
import { UberNormalizer } from './provider/normalizer/uber.normalizer';
import { UberProvider } from './provider/uber.provider';
import { SorterService } from './sorter/sorter.service';

describe('AggregatorController', () => {
  let controller: AggregatorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UtilsModule],
      controllers: [AggregatorController],
      providers: [
        AggregatorConstantsProvider,
        AggregatorService,
        BoltNormalizer,
        BoltProvider,
        SorterService,
        UberNormalizer,
        UberProvider,
      ],
    }).compile();

    controller = module.get<AggregatorController>(AggregatorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
