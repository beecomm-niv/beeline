import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

// טעינת פלאגינים
dayjs.extend(utc);
dayjs.extend(timezone);

// ברירת מחדל: שעון ישראל
dayjs.tz.setDefault('Asia/Jerusalem');

export { dayjs as moment };
