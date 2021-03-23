import { HttpModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JanusService } from './janus/janus.service';
import { JanusModule } from './janus/janus.module';
import { JanusController } from './janus/janus.controller';

@Module({
  imports: [ConfigModule.forRoot(), HttpModule, JanusModule],
  controllers: [JanusController],
  providers: [JanusService],
})
export class AppModule {}
