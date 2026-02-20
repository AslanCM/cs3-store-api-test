import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AppLoggerService } from './common/services/app-logger.service';
import { config } from './config';

async function bootstrap() {
  const configService = config();
  const isProduction = configService.nodeEnv === 'production';

  const app = await NestFactory.create(AppModule);

  const reflector = app.get(Reflector);
  const logger = app.get(AppLoggerService);

  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const gracefulShutdown = async (signal: string, error: Error) => {
    logger.error(
      `Cierre iniciado por ${signal}: ${error.message}`,
      error.stack,
      'ProcessErrorHandler',
    );

    try {
      await app.close();
      logger.log('Aplicación cerrada elegantemente', 'ProcessErrorHandler');
      process.exit(1);
    } catch (shutdownError) {
      logger.error(
        'Error durante el cierre elegante',
        shutdownError.stack,
        'ProcessErrorHandler',
      );
      process.exit(1);
    }
  };

  process
    .on('unhandledRejection', (reason: any) => {
      const error =
        reason instanceof Error ? reason : new Error(String(reason));
      gracefulShutdown('unhandledRejection', error);
    })
    .on('uncaughtException', (error: Error) => {
      gracefulShutdown('uncaughtException', error);
    });

  app.setGlobalPrefix('api');

  if (isProduction) {
    const SwaggerBuilder = new DocumentBuilder()
      .setTitle('Users Logistics API')
      .setVersion('1.0')
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter JWT token in the format: Bearer <token>',
        },
        'Authorization',
      )
      .build();

    const document = SwaggerModule.createDocument(app, SwaggerBuilder);

    SwaggerModule.setup('docs', app, document, {
      useGlobalPrefix: true,
      explorer: true,
      swaggerOptions: {
        filter: true,
        showRequestDuration: true,
      },
    });
  }

  await app.listen(configService.port);
}

bootstrap().catch(() => {
  process.exit(1);
});
