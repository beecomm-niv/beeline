import { UsersUtils } from '@/app/utils/users';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { BranchUtils } from '@/app/utils/branch';
import { Branch } from '@/app/models/branch';
import { ManagementProvider } from '@/app/store/management-provider';
import Drawer from '@/app/components/drawer';

export default async function ManagementLayout({ children }: { children: React.ReactNode }) {
  const header = await headers();
  const userId = header.get('x-authenticated-user');
  const user = await UsersUtils.getUserDtoById(userId || '');

  if (!user) {
    redirect('/login');
  }

  let branch: Branch | null = null;
  if (user.branchId) {
    branch = await BranchUtils.getBranchById(user.branchId);
  }

  return (
    <div>
      <ManagementProvider user={user} branch={branch!}>
        <Drawer />
        {children}
      </ManagementProvider>
    </div>
  );
}
