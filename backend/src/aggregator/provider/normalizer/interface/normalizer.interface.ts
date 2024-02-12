import { RideInformation } from '../../../types';

export interface Normalizer<T> {
  normalize: (options: T[]) => RideInformation[];
}
