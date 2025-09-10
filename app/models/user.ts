export type UserRole = 'super_admin' | 'admin' | 'user';

export interface UserDTO {
  email: string;
  name: string;
  phone: string;
  role: UserRole;
}

export interface User extends UserDTO {
  password: string;
  userId: string;
}
