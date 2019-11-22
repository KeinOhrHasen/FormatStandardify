import * as moment from 'moment';

export const dataToExel_CubeA = function(pointsArray) {
    const data = [[
        'Point Number',
        'Latitude, decimal graduses',
        'Longitude, decimal graduses',
        'Elevation, m',
        'Cartesian_X, m',
        'Cartesian_Y, m',
        'Cartesian_Z, m',
        'Local_N, m',
        'Local_E, m',
        'Local_Z, m',
        'Ant_Hgt KI, m',
        'Ant_Hgt True, m',
        'Solution',
        'SATS',

        'PDOP',
        'HDOP',
        'VDOP',
        'HSDV',
        'VSDV',

        'Date',
        'Time',
    ]];
    pointsArray.forEach((point) => {
      const exelArray = [
        point.pointNumber || point.data.pointNumber || '',
        point.latitude    || point.data.latitude    || '',
        point.longitude   || point.data.longitude   || '',
        // include summary antenna height ( rod + vertical antenna offset) for Geodesic height
        point.elevation   -  point.enteredHR  || point.data.elevation   -  point.enteredHR || '',
        toCartesian(
          point.latitude  || point.data.latitude,
          point.longitude || point.data.longitude,
          // include summary antenna height ( rod + vertical antenna offset) for Cartsian coordinates
          point.elevation -  point.enteredHR || point.data.elevation -  point.enteredHR,
          ).X,
        toCartesian(
          point.latitude  || point.data.latitude,
          point.longitude || point.data.longitude,
          // include summary antenna height ( rod + vertical antenna offset) for Cartsian coordinates
          point.elevation  -  point.enteredHR || point.data.elevation -  point.enteredHR,
          ).Y,
        toCartesian(
          point.latitude   || point.data.latitude ,
          point.longitude  || point.data.longitude,
          // include summary antenna height ( rod + vertical antenna offset) for Cartsian coordinates
          point.elevation  -  point.enteredHR || point.data.elevation -  point.enteredHR,
          ).Z,
        point.northing    || '',
        point.easting     || '',
        point.reducedLocalElevation || '',
        point.enteredRoverHR  ||  '',
        point.enteredHR || '',

        point.STATUS || '',
        point.SATS || '',

        point.PDOP || '',
        point.HDOP || '',
        point.VDOP || '',
        point.HSDV  || '',
        point.VSDV  || '',

        point.startGPSweek ? toUTF(point.startGPSweek, point.startGPStime).date : '',
        point.startGPSweek ? toUTF(point.startGPSweek, point.startGPStime).time : '',
      ];
      data.push(exelArray);
    });

    return data;
  };


function toUTF(GPSdate: string, GPStime): any {
  const gpsInit = moment([1980, 0, 6, 0, 0, 0]);
  gpsInit.add(+GPSdate, 'w');
  gpsInit.add(+GPStime / 1000, 's');

  return {
    date: gpsInit.format('DD.MM.YYYY'),
    time: gpsInit.format('HH:mm:ss')
    };
}

function toCartesian(B: number, L: number, H: number) {
  // B, L to radian
  const B_rad = B * Math.PI / 180;
  const L_rad = L * Math.PI / 180;

  // parameters of elipsoid WGS-84
  const f =	1 / 298.25722356;
  const a =	6378137;

  // additional parameters
  const e2 =	f * (2 - f);
  const W =	(1 - (e2 * (Math.sin(B_rad) ** 2))) ** .5;
  const N =	a / W;

  const X    = (H + N) * Math.cos(B_rad) * Math.cos(L_rad);
  const Y =	(H + N) * Math.cos(B_rad) * Math.sin(L_rad);
  const Z =	(N * (1 - e2) + H) * Math.sin(B_rad);

  return {X, Y, Z};
}
