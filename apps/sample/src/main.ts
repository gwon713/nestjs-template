import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as helmet from 'helmet';
import { ConfigService } from '@nestjs/config';
import { SampleModule } from './sample.module';

async function bootstrap() {
  // cors
  const app = await NestFactory.create(SampleModule, { cors: true });

  // security
  app.use(helmet());

  // swagger
  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // get port
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT_SAMPLE');

  await app.listen(port);
  console.log(`🚀 App listening on the port ${port}`);
}
bootstrap();
