import { Branch } from './branch';
import { UserDTO } from './user';

export interface InitManagementStore {
  user: UserDTO;
  branch: Branch;
}

export interface ManagementStore extends InitManagementStore {
  setUser: (user: UserDTO) => void;
  setBranch: (branch: Branch) => void;
}
