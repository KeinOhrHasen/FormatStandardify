import { toUTF, toCartesian } from '../common-functions/transformations';

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
