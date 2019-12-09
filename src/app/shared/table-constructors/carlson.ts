import { toUTF, toCartesian } from '../common-functions/stonex/transformations';
import { validateValue } from '../common-functions/stonex/type-checking';

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
    'HSDV',
    'VSDV',
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
        validateValue(point.pointNumber || point.data.pointNumber),
        validateValue(point.latitude) || validateValue(point.data.latitude),
        validateValue(point.longitude) || validateValue(point.data.longitude),

        // include summary antenna height ( rod + vertical antenna offset) for Geodesic height
        validateValue(point.elevation  - point.enteredRoverHR) || validateValue(point.data.elevation - point.enteredRoverHR),

        validateValue(toCartesian(
          point.latitude  || point.data.latitude,
          point.longitude || point.data.longitude,
          // include summary antenna height ( rod + vertical antenna offset) for Cartsian coordinates
          point.elevation - point.enteredRoverHR || point.data.elevation - point.enteredRoverHR,
          ).X),
        validateValue(toCartesian(
          point.latitude  || point.data.latitude,
          point.longitude || point.data.longitude,
          // include summary antenna height ( rod + vertical antenna offset) for Cartsian coordinates
          point.elevation - point.enteredRoverHR || point.data.elevation - point.enteredRoverHR,
          ).Y),
        validateValue(toCartesian(
          point.latitude  || point.data.latitude,
          point.longitude || point.data.longitude,
          // include summary antenna height ( rod + vertical antenna offset) for Cartsian coordinates
          point.elevation - point.enteredRoverHR || point.data.elevation - point.enteredRoverHR,
          ).Z),

        validateValue(point.northing),
        validateValue(point.easting),
        validateValue(point.reducedLocalElevation),
        validateValue(point.enteredRoverHR),
        validateValue(+point.enteredRoverHR + +point.antenna_Offset1  ||  +point.enteredRoverHR + +point.data.antenna.antenna_Offset1),

        validateValue(point.STATUS),
        validateValue(point.SATS),
        validateValue(point.AGE),
        validateValue(point.HSDV),
        validateValue(point.VSDV),
        validateValue(point.PDOP),
        validateValue(point.HDOP),
        validateValue(point.VDOP),
        validateValue(point.TDOP),
        validateValue(point.GDOP),
        validateValue(point.NSDV),
        validateValue(point.ESDV),
        validateValue(toUTF(point.startGPSweek, point.startGPStime).date),
        validateValue(toUTF(point.startGPSweek, point.startGPStime).time),
      ];
      data.push(exelArray);
    });

    return data;
  };
