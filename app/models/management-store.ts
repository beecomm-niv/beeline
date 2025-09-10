import { Branch } from './branch';
import { Locale } from './locales';
import { UserDTO } from './user';

export interface InitManagementStore {
  user: UserDTO;
  branch: Branch;
  lang: Locale;
}

export interface ManagementStore extends InitManagementStore {
  setUser: (user: UserDTO) => void;
  setBranch: (branch: Branch) => void;
}
