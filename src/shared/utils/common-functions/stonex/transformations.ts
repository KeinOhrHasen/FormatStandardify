import { IUTF } from '../../../interfaces/stonex/utfDate';
import { ICartesianCoordinates } from '../../../interfaces/stonex/cartesian-coordinates';
import { DateTime } from 'luxon';
import { validateValue } from './type-checking';

export const toUTF = (GPSdate: number, GPStime: number): IUTF => {
  if (!validateValue(GPSdate) || !validateValue(GPStime)) {
    return { date: null, time: null };
  }
  // GPS epoch: 6 Jan 1980
  const gpsEpoch = DateTime.fromObject(
    {
      year: 1980,
      month: 1,
      day: 6,
      hour: 0,
      minute: 0,
      second: 0,
    },
    { zone: 'utc' },
  );

  // Add GPS weeks + seconds (GPS time is in milliseconds)
  console.log(gpsEpoch);
  const dt = gpsEpoch.plus({ weeks: GPSdate }).plus({ seconds: GPStime / 1000 });

  return {
    date: dt.toFormat('dd.MM.yyyy'),
    time: dt.toFormat('HH:mm:ss'),
  };
};

export const toCartesian = function (B: number, L: number, H: number): ICartesianCoordinates {
  // B, L to radian
  const B_rad = (B * Math.PI) / 180;
  const L_rad = (L * Math.PI) / 180;

  // parameters of elipsoid WGS-84
  const f = 0.003352811;
  const a = 6378137.0;

  // additional parameters
  const e2 = f * (2 - f);
  const W = (1 - e2 * Math.sin(B_rad) ** 2) ** 0.5;
  const N = a / W;

  const X = (H + N) * Math.cos(B_rad) * Math.cos(L_rad);
  const Y = (H + N) * Math.cos(B_rad) * Math.sin(L_rad);
  const Z = (N * (1 - e2) + H) * Math.sin(B_rad);

  return { X, Y, Z };
};

export const toDecimalAngle = function (angle: string, units: any): number {
  // 0 == decimal - 360,00
  // 1 == sixtydecimal - 360,mm,ss
  if (units.AU === 1) {
    const [degree, ms] = angle.split('.');
    const minutes = +ms.slice(0, 2);
    const seconds = +ms.slice(2) / 10 ** 10;

    return +degree + minutes / 60 + seconds / 3600;
  } else if (units.AU === 0) {
    return +angle;
  }

  return 0;
};

export const toMeter = function (line: number, units: any): number {
  // 0 == feet
  // 1 == meter
  if (units.UN === 0) {
    return line / 3.280839895;
  }
  return line;
};

export const trimDashes = function (row: string): string {
  return row.replace(/^[- ]*|[-, ]*$/g, '');
};
