'use client';

import { Branch } from '@/app/models/branch';
import { useState } from 'react';
import ApplicationForm from './application-form';
import { Fade } from '@mui/material';
import { OTP } from '../otp';
import { ReservationApplication } from '@/app/models/reservation';

interface Props {
  branch: Branch;
}

const Application = (props: Props) => {
  const [application, setApplication] = useState<ReservationApplication | null>(null);
  const [token, setToken] = useState<string | null>('');

  return (
    <>
      <Fade in={!token} unmountOnExit>
        <div>
          <ApplicationForm branch={props.branch} setToken={setToken} setApplication={setApplication} />
        </div>
      </Fade>
      <Fade in={!!token} timeout={200} unmountOnExit>
        <div>
          <OTP phone={application?.phone || ''} />
        </div>
      </Fade>
    </>
  );
};

export default Application;
