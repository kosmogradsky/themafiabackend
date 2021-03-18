import { Module } from '@nestjs/common';
import { JanusGateway } from './janus.gateway';

@Module({
    providers: [ JanusGateway ]
})
export class JanusModule { }
