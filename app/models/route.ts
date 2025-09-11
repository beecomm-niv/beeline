import { UserRole } from './user';

export interface Route {
  pathname: string;
  useAuthGuard: boolean;
  redirect?: boolean;
  role?: UserRole;
}
