import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as helmet from 'helmet';
import { ConfigService } from '@nestjs/config';
import { UserServerModule } from './user-server.module';

async function bootstrap() {
  const app = await NestFactory.create(UserServerModule, { cors: true });
  // security
  app.use(helmet());

  // swagger
  const config = new DocumentBuilder()
    .setTitle('user server')
    .setDescription('user related api')
    .setVersion('1.0')
    .addTag('user')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // get port
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT_USER');

  await app.listen(port);
  console.log(`🚀 App listening on the port ${port}`);
}
bootstrap();
