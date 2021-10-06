import { NestFactory } from '@nestjs/core';
import { MovieServerModule } from './movie-server.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as helmet from 'helmet';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(MovieServerModule);
  // security
  app.use(helmet());

  // swagger
  const config = new DocumentBuilder()
    .setTitle('movie server')
    .setDescription('movie related api')
    .setVersion('1.0')
    .addTag('movie')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // get port
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT_MOVIE');

  await app.listen(port);
  console.log(`🚀 App listening on the port ${port}`);
}
bootstrap();
