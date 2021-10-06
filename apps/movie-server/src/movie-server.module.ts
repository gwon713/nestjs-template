import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MovieServerController } from './movie-server.controller';
import { MovieServerService } from './movie-server.service';
import { MovieModule } from '@forme/movie';
// import { UtilsModule } from '@forme/utils';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MovieModule,
  ],
  controllers: [MovieServerController],
  providers: [MovieServerService],
})
export class MovieServerModule {}
