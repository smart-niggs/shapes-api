import { Sequelize } from 'sequelize-typescript';
import { ShapeModel } from 'src/modules/shape/shape.model';
import { UserModel } from 'src/modules/user/user.model';
import { configService } from '../config/config.service';
import { SEQUELIZE } from '../constants';


export const databaseProviders = [
    {
        provide: SEQUELIZE,
        useFactory: async () => {
          const sequelize = new Sequelize(configService.getDatabaseUrl());
            sequelize.addModels([UserModel, ShapeModel]);
            await sequelize.sync();
            return sequelize;
        },
    },
];
