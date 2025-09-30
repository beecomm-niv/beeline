'use client';

import { Line } from '@/app/models/branch';
import { CustomerReservation, LightReservation } from '@/app/models/reservation';
import { REALTIME_DATABASE } from '@/app/utils/firebase-client';
import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import { onValue, ref } from 'firebase/database';
import { useEffect, useMemo, useState } from 'react';

import useHttpRequest from '@/app/hooks/request';
import { HttpUtils } from '@/app/utils/http';

interface Props {
  reservation: CustomerReservation;
  lines: Line[];
  token: string;
}

const TrackStatus = (props: Props) => {
  const [waitingList, setWaitingsList] = useState<LightReservation[] | null>([]);

  const { loading, request } = useHttpRequest();
  const place = useMemo(() => (waitingList || []).findIndex((w) => w.id === props.reservation.id) + 1, [props.reservation.id, waitingList]);

  useEffect(() => {
    const dinnersToLineId: Record<number, string> = {};

    props.lines.forEach((l) => l.dinnersRange.forEach((d) => (dinnersToLineId[d] = l.id)));

    const sub = onValue(ref(REALTIME_DATABASE, '/c_line/' + props.reservation.branchId), (snapshot) => {
      const data: Record<string, LightReservation> | null = snapshot.val();

      if (!data) {
        return setWaitingsList(null);
      } else {
        setWaitingsList(
          Object.values(data)
            .map((l) => ({ ...l, lineId: dinnersToLineId[l.dinners] }))
            .sort((a, b) => a.ts - b.ts)
        );
      }
    });

    return sub;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cancelReservation = () => {
    request({
      request: () =>
        HttpUtils.post(
          '/reservations/application/cancel',
          {},
          {
            headers: {
              authorization: props.token,
            },
          }
        ),
    });
  };

  if (!waitingList) {
    return <div>Error</div>;
  }

  return (
    <Box sx={{ display: 'flex', height: '100svh', width: '100%', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: 2, padding: '0 20px' }}>
      <Typography variant='h4'>אתם ברשימת ההמתנה !</Typography>

      <Typography sx={{ marginTop: 2, marginBottom: -1 }} color='text.secondary'>
        מיקומכם בתור הוא
      </Typography>
      <Card sx={{ width: '175px', height: '175px', borderRadius: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CardContent>
          <Typography color='primary' variant='h2'>
            {place}
          </Typography>
        </CardContent>
      </Card>

      <Button variant='contained' color='error' fullWidth sx={{ marginTop: 4, borderRadius: '10px' }} onClick={cancelReservation} disabled={loading}>
        ביטול הרשמה
      </Button>
    </Box>
  );
};

export default TrackStatus;
