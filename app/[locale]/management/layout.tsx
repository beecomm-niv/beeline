import { UsersUtils } from '@/app/utils/users';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import '../../utils/firebase-client';

export default async function ManagementLayout({ children }: { children: React.ReactNode }) {
  const header = await headers();
  const userId = header.get('x-authenticated-user');
  const user = await UsersUtils.getUserDtoById(userId || '');

  if (!user) {
    redirect('/login');
  }

  return <div>{user.email}</div>;
}
