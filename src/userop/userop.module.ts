import { Module } from '@nestjs/common';
import { UseropController } from './userop.controller';
import { UseropService } from './userop.service';

@Module({
  imports: [],
  controllers: [UseropController],
  providers: [UseropService],
  exports: [UseropService],
})
export class UseropModule {}
