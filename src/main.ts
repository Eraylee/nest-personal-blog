import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';
import { initSwagger } from './common/swagger/swagger';
import { serverConfig } from './config';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  initSwagger(app);
  // 注册并配置全局验证管道
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      skipMissingProperties: false,
      forbidUnknownValues: true,
    }),
  );
  // 全局使用过滤器
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(serverConfig.PORT);
}

bootstrap().then(() => {
  new Logger('Nest server').log(
    `Nest server listening on http://localhost:${serverConfig.PORT}`,
  );
});
