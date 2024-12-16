import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { Services1 } from './services';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  controllers: [],
  providers: [...Services1],
  exports: [...Services1],
})
export class TossPaymentsModule {}
