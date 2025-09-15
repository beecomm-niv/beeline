'use client';

import { Branch } from '@/app/models/branch';
import { useState } from 'react';
import ApplicationForm from './application-form';
import { Fade } from '@mui/material';
import { OTP } from '../otp';
import { ReservationApplication } from '@/app/models/reservation';
import { HttpUtils } from '@/app/utils/http';
import useHttpRequest from '@/app/hooks/request';

interface Props {
  branch: Branch;
  accessToken: string;
}

const Application = (props: Props) => {
  const [application, setApplication] = useState<ReservationApplication | null>(null);
  const [token, setToken] = useState<string | null>('');

  const sendOTPApi = useHttpRequest();
  const testCodeApi = useHttpRequest();

  const onSubmitCode = (code: string) => {
    testCodeApi.request({
      request: () =>
        HttpUtils.post(
          '/reservations/application/test',
          { code },
          {
            headers: {
              access_token: token,
            },
          }
        ),
      onSuccess: console.log,
    });
  };

  const onSendOTP = (application: ReservationApplication) => {
    sendOTPApi.request<string>({
      request: () =>
        HttpUtils.post('/reservations/application/create', application, {
          headers: {
            access_token: props.accessToken,
          },
        }),
      onSuccess: (token) => {
        setToken(token);
        setApplication(application);
      },
    });
  };

  const onResend = () => {
    if (application) {
      onSendOTP(application);
    }
  };

  return (
    <>
      <Fade in={!token} unmountOnExit>
        <div>
          <ApplicationForm branch={props.branch} isLoading={sendOTPApi.loading} onSendOTP={onSendOTP} />
        </div>
      </Fade>
      <Fade in={!!token} timeout={200} unmountOnExit>
        <div>
          <OTP phone={application?.phone || ''} isLoading={sendOTPApi.loading || testCodeApi.loading} onSubmit={onSubmitCode} onResend={onResend} />
        </div>
      </Fade>
    </>
  );
};

export default Application;
