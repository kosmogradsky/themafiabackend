import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JanusModule } from './janus/janus.module';

@Module({
  imports: [ConfigModule.forRoot(), JanusModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
