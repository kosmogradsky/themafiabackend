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
  })


  //const app = await NestFactory.create(AppModule);
  //await app.listen(3000);
  await app.startAllMicroservicesAsync();
}

bootstrap();
