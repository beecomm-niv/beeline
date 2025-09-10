import { Branch } from './branch';
import { UserDTO } from './user';

export interface InitStore {
  user: UserDTO;
  branch: Branch;
}

export interface Store {
  user: UserDTO;
  setUser: (user: UserDTO) => void;

  branch: Branch;
  setBranch: (branch: Branch) => void;
}
