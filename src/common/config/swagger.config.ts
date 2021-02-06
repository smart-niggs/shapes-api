import { DocumentBuilder } from '@nestjs/swagger';
import { configService } from './config.service';

export const swaggerOptions = new DocumentBuilder()
  .setTitle('SHAPES API')
  .setDescription('Shapes Api Calculator')
  .setVersion(configService.getAppVersionNo())
  .addBearerAuth(
    { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
    'JWT',
  )
  .build();
