import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { AggregatorModule } from './aggregator/aggregator.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UtilsModule } from './utils/utils.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
      }),
    }),
    UtilsModule.forRoot(),
    AggregatorModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
