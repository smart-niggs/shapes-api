import { IsEnum } from 'class-validator';
import { Column, DataType, Table } from 'sequelize-typescript';
import { BaseModel } from 'src/common/database/models/base.model';
import { ShapeTypes } from './constants';

@Table({
  tableName: 'shape',
  timestamps: true,
  paranoid: true
})

export class ShapeModel extends BaseModel {
  @Column({ allowNull: false })
  @IsEnum(ShapeTypes)
  shape: string;

  @Column({
    allowNull: false,
    type: DataType.JSON
  })
  dimensions: object;

  @Column({ allowNull: true })
  area?: number;

  @Column({
    allowNull: false,
  })
  created_by: number;
}
