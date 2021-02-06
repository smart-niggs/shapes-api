import { Column, CreatedAt, DataType, DeletedAt, Model, PrimaryKey, UpdatedAt } from 'sequelize-typescript';
import { Exclude } from 'class-transformer';
import { json, Sequelize } from 'sequelize';
import { IsPositive } from 'class-validator';


export abstract class BaseModel extends Model<BaseModel> {
  id: number

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;

  @Exclude()
  @DeletedAt
  deleted_at?: Date;
}
