export interface User {
  id: number;
  name: string;
  username: string;
  avatar?: string;
  email?: string;
  phone?: string;
  password: string;
  role: UserRole;
  position: UserPosition;
}

export type CreateUserResponse = {
  name: string;
  username: string;
  email: string;
  phone: string;
  password: string;
  avatar: string;
  position: string;
  id: number;
  role: string;
};

export enum UserRole {
  SUPER_ADMIN = "super_admin",
  MANAGER = "manager",
  QC = "qc",
  USER = "user",
}

export enum UserPosition {
  HEAD_OF_DEPARTMENT = 0,
  MANAGER = 1,
  STAFF = 2,
}
