import { Query } from '../../common/interfaces';
export interface UserRO {
  id: number;
  role: string;
  username: string;
  nickname: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UsersRO extends Query {
  data: UserRO[];
}
