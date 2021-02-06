import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { FindOptions } from 'sequelize';
import { NewShapeDto } from './dto/new-shape.dto';
import { ShapeModel as Shape } from './shape.model';
import { FindAllQueryInterface } from 'src/common/interface/find-query.interface';
import { pagingParser } from 'src/common/utils/paging-parser';
import { SHAPE_REPOSITORY, ERROR_MESSAGES, ShapeTypes } from './constants';


@Injectable()
export class ShapeService {
  constructor(
    @Inject(SHAPE_REPOSITORY) private readonly shapeRepo: typeof Shape,
  ) { }

  async calculateArea(newShape: NewShapeDto): Promise<Shape | any> {

    switch (newShape.shape) {
      case ShapeTypes.square:
        newShape.area = Math.pow(newShape.dimensions.side, 2);
        break;
      case ShapeTypes.rectangle:
        newShape.area = newShape.dimensions.length * newShape.dimensions.breadth;
        break;
      case ShapeTypes.triangle:
        newShape.area = calAreaTriangle(newShape.dimensions);
        break;
      case ShapeTypes.circle:
        newShape.area = Math.pow(newShape.dimensions.radius, 2) * Math.PI;
        break;
      default:
        break;
    }

    // persist data in database
    const { shape, dimensions, area } = await this.shapeRepo.create(newShape);
    return {
      shape, dimensions, area
    };
  }

  async findAll(params): Promise<FindAllQueryInterface<Shape>> {
    const query: FindOptions = {
      limit: params.limit,
      offset: params.skip,
      order: params.order,
      attributes: {
        exclude: ['deleted_at', 'updated_at']
      },
      where: {
        ...params.where
      }
    };

    const shapes = await this.shapeRepo.findAndCountAll(query);
    const paging = pagingParser(query, shapes.count, shapes.rows.length);

    return {
      paging,
      data: shapes.rows
    };
  }

  async findOne(id: number, created_by: number): Promise<Shape> {
    const shape = await this.shapeRepo.findOne({
      where: { id, created_by },
      attributes: { exclude: ['deleted_at'] }
    });
    if (!shape)
      throw new BadRequestException(ERROR_MESSAGES.ShapeNotFound);

    return shape;
  }
}

const calAreaTriangle = (dimensions: any) => {
  const a = dimensions.length_a;
  const b = dimensions.length_b;
  const c = dimensions.length_c;
  const s = (a + b + c) / 2;

  return Math.sqrt(s * (s - a) * (s - b) * (s - c));
}
