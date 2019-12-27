/*
 * @Author: ERAYLEE
 * @Date: 2019-09-06 21:06:33
 * @LastEditors  : ERAYLEE
 * @LastEditTime : 2019-12-26 14:25:19
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
}
