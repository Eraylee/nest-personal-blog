import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

const options = new DocumentBuilder()
  .setTitle('NestJS ERAYLEE BLOG Server')
  .setDescription('个人网站服务器api')
  .setVersion('1.0')
  .addBearerAuth()
  .build();

export const initSwagger = (app: any) => {
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/docs', app, document);
};
