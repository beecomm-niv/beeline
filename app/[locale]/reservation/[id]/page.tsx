import Application from '@/app/components/application';
import ApplicationExpired from '@/app/components/application/application-expired';
import { BranchUtils } from '@/app/utils/branch';
import { JwtUtils } from '@/app/utils/jwt';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ReservationPage(props: Props) {
  const accessToken = (await props.params).id;
  if (!accessToken) {
    return <div>Bad request</div>;
  }

  const payload = await JwtUtils.verifyToken<{ branchId: string }>(accessToken);
  if (!payload) {
    return <ApplicationExpired />;
  }

  const branch = await BranchUtils.getBranchById(payload.branchId);
  if (!branch) {
    return <div>Bad request</div>;
  }

  return <Application branch={branch} accessToken={accessToken} />;
}
