import dayjs from 'dayjs';

export function isPhoneNumber(str: string) {
  return /^1[3456789]\d{9}$/.test(str);
}

export function isThisYear(str: string) {
  return (
    dayjs(str).isAfter(dayjs().startOf('years')) &&
    dayjs(str).isBefore(dayjs().endOf('years'))
  );
}
