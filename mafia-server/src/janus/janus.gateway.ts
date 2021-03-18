import {
    SubscribeMessage,
    MessageBody,
    WebSocketGateway,
    WebSocketServer,
    OnGatewayInit,
    OnGatewayConnection,
    OnGatewayDisconnect,
    ConnectedSocket,
    WsResponse,
} from '@nestjs/websockets';

import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';

@WebSocketGateway(parseInt(process.env.EVENT_HANDLER_PORT, 10) || 3331, { transports: ['websocket'] })
//@WebSocketGateway()
export class JanusGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

    @WebSocketServer() server: Server;
    private logger: Logger = new Logger('JanusGateway');

    @SubscribeMessage('events')
    handleMessage(@MessageBody() data: string): WsResponse<unknown> {
        this.logger.log(`Event accepted: ${data}`);
        return {
            event: 'events',
            data: data
        };
    }

    afterInit(server: Server) {
        this.logger.log(`Gateway initialized`);
    }

    handleDisconnect(client: Socket) {
        this.logger.log(`Client disconnected: ${client.id}`);
    }

    handleConnection(client: Socket, ...args: any[]) {
        this.logger.log(`Client connected: ${client.id}`);
        client.send("Hey!");
        return true;
    }
}