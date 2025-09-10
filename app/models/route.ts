export interface Route {
  pathname: string;
  useAuthGuard: boolean;
  default?: boolean;
  redirect?: boolean;
}
