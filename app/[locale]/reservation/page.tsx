import Application from '@/app/components/application';
import { BranchUtils } from '@/app/utils/branch';
import { JwtUtils } from '@/app/utils/jwt';

export default async function ReservationPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const branchId = (await searchParams).q;
  if (!branchId || typeof branchId !== 'string') {
    return <div>Welcome</div>;
  }

  const branch = await BranchUtils.getBranchById(branchId);
  if (!branch) {
    return <div>Welcome</div>;
  }

  const accessToken = await JwtUtils.getToken({ branchId }, '5m');
  if (!accessToken) {
    return <div>Welcome</div>;
  }

  return <Application branch={branch} accessToken={accessToken} />;
}
