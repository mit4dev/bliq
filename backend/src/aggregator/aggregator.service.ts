import { Injectable } from '@nestjs/common';
import { BoltProvider } from './provider/bolt.provider';
import { UberProvider } from './provider/uber.provider';
import { SorterService } from './sorter/sorter.service';
import { RideInformation } from './types';

@Injectable()
export class AggregatorService {
  constructor(
    private readonly uber: UberProvider,
    private readonly bolt: BoltProvider,
    private readonly sorter: SorterService,
  ) {}

  async getAll(): Promise<RideInformation[]> {
    const results = await Promise.all([
      this.uber.getOptions(),
      this.bolt.getOptions(),
    ]);

    const flattened = results.flatMap((r) => r);

    return this.sorter.byAveragePriceAsc(flattened);
  }
}
