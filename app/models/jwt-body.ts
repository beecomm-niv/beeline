import { UserRole } from './user';

export interface JwtBody {
  userId: string;
  role: UserRole;
}
