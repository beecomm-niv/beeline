import { Line } from '@/app/models/branch';
import { CustomerReservation, LightReservation } from '@/app/models/reservation';
import { REALTIME_DATABASE } from '@/app/utils/firebase-client';
import { Box, Button, Typography } from '@mui/material';
import { onValue, ref } from 'firebase/database';
import { useEffect, useMemo, useState } from 'react';

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
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
      onDecline: () => window.alert('נכשל לבטל הזמנה'),
    });
  };

  if (!waitingList) {
    return <div>Error</div>;
  }

  return (
    <Box sx={{ textAlign: 'center', paddingTop: 10 }}>
      <CheckCircleOutlineIcon sx={{ fontSize: 50 }} />

      <Typography variant='h5' fontWeight='bold'>
        תודה רבה על ההמתנה !
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', gap: -2, marginTop: 10 }}>
        <Typography color='text.secondary'>מקומך בתור הוא</Typography>
        <Typography variant='h4'>{place || ''}</Typography>
      </Box>

      <Box sx={{ marginTop: 10, padding: '0 10%' }}>
        <Button color='error' variant='outlined' fullWidth sx={{ borderRadius: 10 }} disabled={loading} onClick={cancelReservation}>
          ביטול הזמנה
        </Button>
      </Box>
    </Box>
  );
};

export default TrackStatus;
