import { Branch } from './branch';
import { Locale } from './locales';
import { UserDTO } from './user';

export interface InitStore {
  user: UserDTO;
  branch: Branch;
  lang: Locale;
}

export interface Store extends InitStore {
  setUser: (user: UserDTO) => void;
  setBranch: (branch: Branch) => void;
}
