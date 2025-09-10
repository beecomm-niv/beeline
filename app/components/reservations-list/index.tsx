'use client';

import { useAppStore } from '@/app/hooks/useAppStore';

const ReservationList = () => {
  const user = useAppStore((s) => s.user);

  return <div>{user.name}</div>;
};

export default ReservationList;
