import { Module } from '@nestjs/common';
import { ShapeController } from './shape.controller';
import { ShapeService } from './shape.service';
import { ShapeProvider } from './shape.provider';

@Module({
  providers: [ShapeService, ...ShapeProvider],
  controllers: [ShapeController],
  exports: [ShapeService]
})
export class ShapeModule {}
