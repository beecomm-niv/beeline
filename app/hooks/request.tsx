'use client';

import { useCallback, useState } from 'react';
import { ApiResponse } from '../models/api-response';
import { useSnackbar } from 'notistack';
import { Locale } from '../models/locales';
import { useAppStore } from '../store/appStore-provider';

const messages: Record<Locale, Record<number, string>> = {
  he: {
    1012: 'יש להזין מספר טלפון תקין',
    1011: 'התוקף של האסימון פג. אנא התחבר מחדש כדי להמשיך.',
    1010: 'נכשל להעלות תמונה',
    1009: 'נכשל לשלוח SMS',
    1008: 'נכשל לשלוח SMS',
    1007: 'הקוד שהוזן אינו תואם',
    1006: 'יותר מדי ניסיונות. אנא נסו שוב מאוחר יותר',
    1005: 'ללקוח קיימת הזמנה פתוחה. אנא נסו שוב מאוחר יותר',
    1003: 'האימייל כבר בשימוש',
    1002: 'נתוני הבקשה אינם תקינים',
    1001: 'אירעה שגיאה בטעינת המשתמש. אנא נסה שוב מאוחר יותר',
    1000: 'שם משתמש או סיסמא אינם תקינים',
  },
  en: {
    1012: 'Please insert valid phone number',
    1011: 'Token has expired. Please scan the QR code again.',
    1010: 'Failed to upload image',
    1009: 'Failed to send SMS',
    1008: 'Failed to send SMS',
    1007: 'The code entered does not match',
    1006: 'Too many attempts. Please try again later',
    1005: 'The customer has an open order. Please try again later',
    1003: 'This email address is already in use',
    1002: 'The requested body is invalid',
    1001: 'Failed to fetch user. Please try again later',
    1000: 'Bad Username or Password',
  },
};

interface Props<T> {
  request: () => Promise<ApiResponse<T>>;
  onSuccess?: (data: T) => void;
  onDecline?: (data: T, errorMessage: string) => void;
}

const useHttpRequest = () => {
  const [loading, setLoading] = useState(false);
  const lang = useAppStore((s) => s.lang);

  const snackbar = useSnackbar();

  const request = useCallback(async <T,>(params: Props<T>, alertOnError: boolean = true) => {
    setLoading(true);

    const response = await params.request();

    if (response.hasError) {
      if (alertOnError) {
        snackbar.enqueueSnackbar(messages[lang][response.statusCode] || response.errorMessage, { variant: 'error' });
      }

      if (params.onDecline) {
        params.onDecline(response.value, response.errorMessage);
      }
    } else if (!response.hasError && params.onSuccess) {
      params.onSuccess(response.value);
    }

    setLoading(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { loading, request };
};

export default useHttpRequest;
