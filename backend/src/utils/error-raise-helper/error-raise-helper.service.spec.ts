import { Test, TestingModule } from '@nestjs/testing';
import { ErrorRaiseHelperService } from './error-raise-helper.service';

describe('ErrorRaiseHelperService', () => {
  let service: ErrorRaiseHelperService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ErrorRaiseHelperService],
    }).compile();

    service = module.get<ErrorRaiseHelperService>(ErrorRaiseHelperService);
  });

  it('should never return false when rate is 0', () => {
    expect(service.shouldError(0)).toBe(false);
  });

  it('should return true when rate is 1', () => {
    expect(service.shouldError(1)).toBe(true);
  });
});
