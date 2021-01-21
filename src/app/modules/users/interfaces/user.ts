export interface User {
  _id: string;
  avatar: string;
  name: string;
  birthday: Date;
  country: string;
  apps: App[];
  appsCount: number;
}

interface App {
  _id: string;
  name: string;
  avatar: string;
}

export interface UsersResponse {
  data: User[];
  status: string;
  userCount: number;
}
export interface UserResponse {
  data: User;
  status: string;
}
