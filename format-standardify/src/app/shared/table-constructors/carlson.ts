import * as moment from 'moment';

export const dataToExel_Carlson = function(pointsArray) {
    const data = [[
        'Point Number',
        'Latitude, decimal graduses',
        'Longitude, decimal graduses',
        'Elevation',
        'Cartesian_X, m',
        'Cartesian_Y, m',
        'Cartesian_Z, m',
        'Local_N, m',
        'Local_E, m',
        'Local_Z, m',
        'Ant_Hgt KI',
        'Ant_Hgt True',
        'Solution',
        'SATS',
        'AGE',
        'PDOP',
        'HDOP',
        'VDOP',
        'TDOP',
        'GDOP',
        'NSDV',
        'ESDV',
        'Date',
        'Time',
    ]];
    pointsArray.forEach((point) => {
      const exelArray = [
        point.pointNumber || point.data.pointNumber || '',
        point.latitude    || point.data.latitude    || '' ,
        point.longitude   || point.data.longitude   || '' ,
        point.elevation   || point.data.elevation   || '' ,
        toCartesian(
          point.latitude  || point.data.latitude,
          point.longitude || point.data.longitude,
          point.elevation || point.data.elevation,
          ).X,
        toCartesian(
          point.latitude  || point.data.latitude,
          point.longitude || point.data.longitude,
          point.elevation || point.data.elevation,
          ).Y,
        toCartesian(
          point.latitude  || point.data.latitude,
          point.longitude || point.data.longitude,
          point.elevation || point.data.elevation,
          ).Z,
        point.northing    || '',
        point.easting     || '',
        point.reducedLocalElevation || '',
        point.data ? point.enteredRoverHR  : '',
        point.data ? +point.enteredRoverHR + +point.data.antenna.antenna_Offset1  : '',
        point.STATUS || '',
        point.SATS || '',
        point.AGE  || '',
        point.PDOP || '',
        point.HDOP || '',
        point.VDOP || '',
        point.TDOP || '',
        point.GDOP || '',
        point.NSDV || '',
        point.ESDV || '',
        toUTF(point.startGPSweek, point.startGPStime).date || '',
        toUTF(point.startGPSweek, point.startGPStime).time || '',
      ];
      data.push(exelArray);
    });

    return data;
  };


function toUTF(GPSdate: string, GPStime): any {
  const gpsInit = moment([1980, 0, 6, 0, 0, 0]);
  gpsInit.add(+GPSdate, 'w');
  gpsInit.add(+GPStime / 1000, 's');
  console.log({date: gpsInit.format('dddd, MMMM Do YYYY'), time: gpsInit.format('h:mm:ss a')});

  return {date: gpsInit.format('dddd, MMMM Do YYYY'), time: gpsInit.format('h:mm:ss a')};
}

function toCartesian(B, L, H) {
  // B, L to radian
  const B_rad = B * Math.PI / 180;
  const L_rad = L * Math.PI / 180;

  // parameters of elipsoid WGS-84
  const f =	0.003352811;
  const a =	6378137.000;

  // additional parameters
  const e2 =	f * (2 - f);
  const W =	(1 - (e2 * (Math.sin(B_rad) ** 2))) ** .5;
  const N =	a / W;

  const X = (H + N) * Math.cos(B_rad) * Math.cos(L_rad);
  const Y =	(H + N) * Math.cos(B_rad) * Math.sin(L_rad);
  const Z =	((N * (1 - e2)) + H) * Math.sin(B_rad);

  return {X, Y, Z};
}
