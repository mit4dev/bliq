import { Controller, Get, Version } from '@nestjs/common';
import { AggregatorService } from './aggregator.service';
import { RideInformation } from './types';

@Controller('aggregates')
export class AggregatorController {
  constructor(private readonly service: AggregatorService) {}

  @Version('1')
  @Get()
  aggregates(): Promise<RideInformation[]> {
    return this.service.getAll();
  }
}
