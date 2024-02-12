import { RideInformation } from '../../types';

export interface Provider {
  getOptions: () => Promise<RideInformation[]>;
}
