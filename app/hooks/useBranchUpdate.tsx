import { useCallback } from 'react';
import { Branch } from '../models/branch';
import { useManagementStore } from '../store/management-provider';
import { HttpUtils } from '../utils/http';
import useHttpRequest from './request';

const useBranchAction = () => {
  const branch = useManagementStore((s) => s.branch);
  const setBranch = useManagementStore((s) => s.setBranch);

  const { loading, request } = useHttpRequest();

  const saveBranch = useCallback((b: Branch) => {
    request({
      request: () => HttpUtils.post('/branches/update', b),
      onSuccess: () => setBranch(b),
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { loading, branch, saveBranch };
};

export default useBranchAction;
