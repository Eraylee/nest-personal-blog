/*
 * @Author: ERAYLEE
 * @Date: 2019-12-26 22:00:54
 * @LastEditors: ERAYLEE
 * @LastEditTime: 2019-12-26 22:01:06
 */
import { Query } from '../../common/interfaces';
export interface UserRO {
  id: string;
  role: string;
  username: string;
  nickname: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UsersRO extends Query {
  data: UserRO[];
}
