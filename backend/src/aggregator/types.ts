export enum ProviderType {
  Uber = 'UBER',
  Bolt = 'BOLT',
}

/**
 * ISO 4217 compliant Currency codes
 */
export enum Currency {
  EUR = 'EUR',
}

export enum PriceType {
  Fixed = 'FIXED',
  Range = 'RANGE',
}

type FixedPrice = {
  fixed: number;
  type: PriceType.Fixed;
  low?: never;
  high?: never;
};
type RangePrice = {
  low: number;
  high: number;
  type: PriceType.Range;
  fixed?: never;
};
export type RidePrice = FixedPrice | RangePrice;

export enum CarType {
  Eco = 'ECO',
  Luxurious = 'LUXURIOUS',
  Large = 'LARGE',
}

export type RideInformation = {
  id: string;
  provider: ProviderType;
  price: RidePrice;
  currency: Currency;
  carType: CarType;
  durationMinutes: number;
};

const isFixedPrice = (price: RidePrice): price is FixedPrice => {
  const conditions = [
    price.type === PriceType.Fixed,
    'fixed' in price,
    typeof price?.fixed === 'number',
  ];

  return conditions.every(Boolean);
};

const isRangePrice = (price: RidePrice): price is RangePrice => {
  const conditions = [
    price.type === PriceType.Range,
    'low' in price,
    'high' in price,
    typeof price?.low === 'number',
    typeof price?.high === 'number',
  ];

  return conditions.every(Boolean);
};

export function assertFixedPrice(
  price: RidePrice,
): asserts price is FixedPrice {
  if (!isFixedPrice(price)) {
    throw new Error(`Price is not a fixed price: ${price}`);
  }
}

export function assertRangePrice(
  price: RidePrice,
): asserts price is RangePrice {
  if (!isRangePrice(price)) {
    throw new Error(`Price is not a range price: ${price}`);
  }
}
