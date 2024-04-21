import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { config } from './common/config';
import { UseropService } from './userop/userop.service';
import { UseropController } from './userop/userop.controller';
import { UseropModule } from './userop/userop.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
    }),
    UseropModule,
  ],
  controllers: [UseropController],
  providers: [UseropService],
})
export class AppModule {}
