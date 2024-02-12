import { Test, TestingModule } from '@nestjs/testing';
import { RandomHelperService } from './random-helper.service';

// Testing the code borrowed from StackOverflow (we may argue this might not be a good idea since you don't usually try to test third party code)
// However, I am testing it for the sake of completeness.

describe('RandomHelperService', () => {
  let service: RandomHelperService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RandomHelperService],
    }).compile();

    service = module.get<RandomHelperService>(RandomHelperService);
  });

  it('should return randomized integers including edges', () => {
    const positiveEdge = service.integer(5, 5);
    const positive = service.integer(10, 15);
    const negativeEdge = service.integer(-5, -5);
    const negative = service.integer(-25, -20);
    const range = service.integer(-100, 100);

    expect(positiveEdge).toEqual(5);

    expect(positive).toBeGreaterThanOrEqual(10);
    expect(positive).toBeLessThanOrEqual(15);

    expect(negativeEdge).toEqual(-5);

    expect(negative).toBeGreaterThanOrEqual(-25);
    expect(negative).toBeLessThanOrEqual(-20);

    expect(range).toBeGreaterThanOrEqual(-100);
    expect(range).toBeLessThanOrEqual(100);
  });
});
