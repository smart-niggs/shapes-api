import { ApiHideProperty } from '@nestjs/swagger';
import { IsEnum, IsObject, IsOptional, IsPositive } from 'class-validator';
import { isValidDimensions } from 'src/modules/shape/dto/validator/is-valid-dimensions.decorator';
import { ShapeTypes } from '../constants';

export class NewShapeDto {
  @IsEnum(ShapeTypes, { message: `Shape must be any of: ${Object.values(ShapeTypes)}`})
  shape: string;

  @isValidDimensions('shape')
  dimensions: object | any;

  @ApiHideProperty()
  @IsOptional()
  @IsPositive()
  area?: number

  @ApiHideProperty()
  @IsOptional()
  @IsPositive()
  created_by?: number
}
