import { DynamicModule, Module } from '@nestjs/common';
import { ErrorRaiseHelperService } from './error-raise-helper/error-raise-helper.service';
import { RandomHelperService } from './random-helper/random-helper.service';
import { SleepHelperService } from './sleep-helper/sleep-helper.service';

@Module({
  providers: [ErrorRaiseHelperService, RandomHelperService, SleepHelperService],
  exports: [ErrorRaiseHelperService, RandomHelperService, SleepHelperService],
})
export class UtilsModule {
  static forRoot(): DynamicModule {
    return {
      module: UtilsModule,
      global: true,
      providers: [
        ErrorRaiseHelperService,
        RandomHelperService,
        SleepHelperService,
      ],
      exports: [
        ErrorRaiseHelperService,
        RandomHelperService,
        SleepHelperService,
      ],
    };
  }
}
