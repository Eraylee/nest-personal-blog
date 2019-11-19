import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { ValidationPipe, Logger } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { initSwagger } from './common/swagger/swagger';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

const port = Number(process.env.PORT) || 5050;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  initSwagger(app);
  // 注册并配置全局验证管道
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      skipMissingProperties: true,
      forbidUnknownValues: true,
    }),
  );
  app.useStaticAssets(join(__dirname, '..', 'public'));
  // 全局使用过滤器
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(port);
}

bootstrap().then(() => {
  new Logger('Nest server').log(
    `Nest server listening on http://localhost:${port}`,
  );
});
