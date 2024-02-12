import { Module } from '@nestjs/common';
import { AggregatorController } from './aggregator.controller';
import { AggregatorService } from './aggregator.service';
import { AggregatorConstantsProvider } from './constants/constants.provider';
import { BoltProvider } from './provider/bolt.provider';
import { BoltNormalizer } from './provider/normalizer/bolt.normalizer';
import { UberNormalizer } from './provider/normalizer/uber.normalizer';
import { UberProvider } from './provider/uber.provider';
import { SorterService } from './sorter/sorter.service';

@Module({
  providers: [
    AggregatorConstantsProvider,
    AggregatorService,
    BoltNormalizer,
    BoltProvider,
    SorterService,
    UberNormalizer,
    UberProvider,
  ],
  controllers: [AggregatorController],
})
export class AggregatorModule {}
