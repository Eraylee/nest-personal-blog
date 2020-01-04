/*
 * @Author: ERAYLEE
 * @Date: 2019-09-06 21:06:33
 * @LastEditors  : ERAYLEE
 * @LastEditTime : 2020-01-04 22:08:54
 */
// export { Result } from './result.interface';
export { Query } from './query.interface';

export interface Result<T> {
  code: number;
  message: string;
  data: T;
}

export interface PaginationResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  maxPage: number;
}
