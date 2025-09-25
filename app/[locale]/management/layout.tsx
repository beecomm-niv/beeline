import { UsersUtils } from '@/app/utils/users';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { BranchUtils } from '@/app/utils/branch';
import { Branch } from '@/app/models/branch';
import { ManagementProvider } from '@/app/store/management-provider';
import Drawer from '@/app/components/drawer';
import NoBranch from '@/app/components/no-branch';
import ReservationsHandler from '@/app/components/home/reservations-handler';

export default async function ManagementLayout({ children }: { children: React.ReactNode }) {
  const header = await headers();
  const userId = header.get('x-authenticated-user');
  const user = await UsersUtils.getUserDtoById(userId || '');

  if (!user) {
    return redirect('/login');
  }

  let branch: Branch | null = null;
  if (user.branchId) {
    branch = await BranchUtils.getBranchById(user.branchId);
  }

  if (!branch) {
    return <NoBranch />;
  }

  return (
    <div>
      <ManagementProvider user={user} branch={branch}>
        <div style={{ width: '100%', display: 'flex', height: '100svh' }}>
          <div style={{ width: '25%' }}>
            <Drawer branchName={branch.name} />
          </div>
          <div style={{ width: '75%' }}>
            <ReservationsHandler branchId={branch.id}>{children}</ReservationsHandler>
          </div>
        </div>
      </ManagementProvider>
    </div>
  );
}
