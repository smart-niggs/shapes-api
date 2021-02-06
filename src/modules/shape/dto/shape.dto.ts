import { BaseDto } from "src/common/dto/base.dto";

export class ShapeDto extends BaseDto {
  readonly shape: string;
  readonly dimensions: object;
  readonly area?: number;
  readonly created_by?: number;
}
