'use client';

import { useAppStore } from '@/app/store/management-provider';

const ReservationList = () => {
  const user = useAppStore((s) => s.user);

  return <div></div>;
};

export default ReservationList;
