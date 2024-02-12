import { Test, TestingModule } from '@nestjs/testing';
import { SleepHelperService } from './sleep-helper.service';

describe('SleepHelperService', () => {
  let service: SleepHelperService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SleepHelperService],
    }).compile();

    service = module.get<SleepHelperService>(SleepHelperService);
  });

  it('should sleep for at least the specified amount of time', async () => {
    const start = Date.now();
    await service.sleep(100);
    const end = Date.now();

    expect(end - start).toBeGreaterThanOrEqual(100);
  });
});
