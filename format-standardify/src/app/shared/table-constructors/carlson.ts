import { toUTF, toCartesian } from '../common-functions/stonex/transformations';

export const dataToExel_Carlson = function(pointsArray) {
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
        point.latitude    || point.data.latitude    || '',
        point.longitude   || point.data.longitude   || '',
        // include summary antenna height ( rod + vertical antenna offset) for Geodesic height
        point.elevation  - point.enteredRoverHR || point.data.elevation - point.enteredRoverHR || '' ,
        toCartesian(
          point.latitude  || point.data.latitude,
          point.longitude || point.data.longitude,
          // include summary antenna height ( rod + vertical antenna offset) for Cartsian coordinates
          point.elevation - point.enteredRoverHR || point.data.elevation - point.enteredRoverHR,
          ).X,
        toCartesian(
          point.latitude  || point.data.latitude,
          point.longitude || point.data.longitude,
          // include summary antenna height ( rod + vertical antenna offset) for Cartsian coordinates
          point.elevation - point.enteredRoverHR || point.data.elevation - point.enteredRoverHR,
          ).Y,
        toCartesian(
          point.latitude  || point.data.latitude,
          point.longitude || point.data.longitude,
          // include summary antenna height ( rod + vertical antenna offset) for Cartsian coordinates
          point.elevation - point.enteredRoverHR || point.data.elevation - point.enteredRoverHR,
          ).Z,
        point.northing    || '',
        point.easting     || '',
        point.reducedLocalElevation || '',
        point.enteredRoverHR,
        +point.enteredRoverHR + +point.antenna_Offset1  ||  +point.enteredRoverHR + +point.data.antenna.antenna_Offset1 || '',

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
        point.startGPSweek ? toUTF(point.startGPSweek, point.startGPStime).date : '',
        point.startGPSweek ? toUTF(point.startGPSweek, point.startGPStime).time : '',
      ];
      data.push(exelArray);
    });

    return data;
  };



