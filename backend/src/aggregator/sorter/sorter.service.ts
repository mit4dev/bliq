import { Injectable } from '@nestjs/common';
import {
  PriceType,
  RideInformation,
  RidePrice,
  assertFixedPrice,
  assertRangePrice,
} from '../types';

const priceCalculationMapping: Record<PriceType, (price: RidePrice) => number> =
  {
    [PriceType.Fixed]: (price) => {
      assertFixedPrice(price);

      return price.fixed;
    },
    [PriceType.Range]: (price) => {
      assertRangePrice(price);

      return (price.high + price.low) / 2;
    },
  };

@Injectable()
export class SorterService {
  byAveragePriceAsc(options: RideInformation[]): RideInformation[] {
    // Rationale: avoid mutating the args
    // Sorting mutates the original array, so create a deep clone
    const buffer = structuredClone(options);

    return buffer.sort(
      ({ price: priceA }, { price: priceB }) =>
        priceCalculationMapping[priceA.type](priceA) -
        priceCalculationMapping[priceB.type](priceB),
    );
  }
}
