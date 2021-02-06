import { Body, Controller, Get, Param, ParseIntPipe, Post, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiHeaders, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User as GetUser } from 'src/common/decorator/user.decorator';
import { parseQueryObj } from 'src/common/utils/query-parser';
import { NewShapeDto } from './dto/new-shape.dto';
import { ShapeService } from './shape.service';
import { JWT_HEADERS } from 'src/common/constants';
import { ShapeModel as Shape } from './shape.model';
import { ShapeQueryFiltersDto } from './dto/shape-query-filters.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';


@ApiTags('Shapes')
@ApiBearerAuth('JWT')
@UseGuards(JwtAuthGuard)
@Controller('shape')
export class ShapeController {
  constructor(private readonly shapeService: ShapeService) { }

  @Post('calculate-area')
  async calculateArea(
    @Body(new ValidationPipe()) newShape: NewShapeDto,
    @GetUser('id') userId: number
  ) {
    newShape.created_by = userId;
    return this.shapeService.calculateArea(newShape);
  }

  @Get()
  @ApiResponse({ type: Shape })
  async findAll(@Query(new ValidationPipe({ transform: true })) query: ShapeQueryFiltersDto,
    @GetUser('id') userId: number) {

    query.created_by = userId;
    query = parseQueryObj(query, ['created_by']);

    return this.shapeService.findAll(query);
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
    @GetUser('id') userId: number
  ) {
    return this.shapeService.findOne(id, userId);
  }
}
