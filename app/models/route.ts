import { UserRole } from './user';

export interface Route {
  pathname: string;
  useAuthGuard: boolean;
  role?: UserRole;
}
