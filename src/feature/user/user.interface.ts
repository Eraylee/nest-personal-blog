import { Query } from '../../common/interfaces';
export interface UserData {
  id: number;
  username: string;
  nickname: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserRO {
  user: UserData;
}
export interface UsersRO extends Query {
  users: UserData[];
}
