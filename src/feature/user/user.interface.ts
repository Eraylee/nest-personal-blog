import { Query } from '../../common/interfaces';
export interface UserRO {
  id: number;
  username: string;
  nickname: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UsersRO extends Query {
  data: UserRO[];
}
