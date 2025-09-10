import { UserRole } from './user';

export interface Route {
  pathname: string;
  useAuthGuard: boolean;
  default?: boolean;
  redirect?: boolean;
  role?: UserRole;
}
