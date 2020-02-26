/*
 * @Author: ERAYLEE
 * @Date: 2020-01-16 17:22:25
 * @LastEditors: ERAYLEE
 * @LastEditTime: 2020-02-26 15:46:15
 */

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

const idDev = process.env.NODE_ENV === 'development';
const options = new DocumentBuilder()
  .setTitle('NestJS ERAYLEE BLOG Server')
  .setDescription('个人网站服务器api')
  .setVersion('1.0')
  .addBearerAuth()
  .build();

export const initSwagger = (app: any) => {
  if (idDev) {
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('/docs', app, document);
  }
};
