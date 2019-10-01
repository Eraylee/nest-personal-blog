import { createParamDecorator } from '@nestjs/common';

export const User = createParamDecorator((data, req) => {
  // if route is protected, there is a user set in auth.middleware
  if (!!req.user) {
    return !!data ? req.user[data] : req.user;
  }
});
