import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';

import { AppModule } from './app.module';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const microserviceRMQ = app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://' + process.env.RABBITMQ_HOST + ':' + process.env.RABBITMQ_PORT],
      queue: process.env.JANUS_EVENTS_QUEUE,
      queueOptions: {
        durable: false
      }
    }
  });

  const microserviceTCP = app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      port: process.env.TCP_PORT || 3001,
    },
  })

  await app.listen(3000);
  await app.startAllMicroservicesAsync();
}

bootstrap();
