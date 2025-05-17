import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { AllExceptionsFilter } from './all-exception.filter';
import { MyLoggerService } from './my-logger/my-logger.service';

async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  // const { httpAdapter } = app.get(HttpAdapterHost);
  // app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.useLogger(app.get(MyLoggerService));

  app.enableCors({ origin: 'http://localhost:3001' });
  app.setGlobalPrefix('api/v1');
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
