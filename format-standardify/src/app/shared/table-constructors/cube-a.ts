import { toUTF, toCartesian } from '../common-functions/stonex/transformations';
import { validateValue } from '../common-functions/stonex/type-checking';

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
        validateValue(point.pointNumber || point.data.pointNumber),
        validateValue(point.latitude) || validateValue(point.data.latitude),
        validateValue(point.longitude) || validateValue(point.data.longitude),

        // include summary antenna height ( rod + vertical antenna offset) for Geodesic height
        validateValue(point.elevation  - point.enteredHR)  || validateValue(point.data.elevation  - point.enteredHR),

        validateValue(toCartesian(
            point.latitude  || point.data.latitude,
            point.longitude || point.data.longitude,
            // include summary antenna height ( rod + vertical antenna offset) for Cartsian coordinates
            point.elevation -  point.enteredHR || point.data.elevation -  point.enteredHR,
        ).X),
        validateValue(toCartesian(
            point.latitude  || point.data.latitude,
            point.longitude || point.data.longitude,
            // include summary antenna height ( rod + vertical antenna offset) for Cartsian coordinates
            point.elevation  -  point.enteredHR || point.data.elevation -  point.enteredHR,
        ).Y),
        validateValue(toCartesian(
            point.latitude   || point.data.latitude ,
            point.longitude  || point.data.longitude,
            // include summary antenna height ( rod + vertical antenna offset) for Cartsian coordinates
            point.elevation  -  point.enteredHR || point.data.elevation -  point.enteredHR,
        ).Z),

        validateValue(point.northing),
        validateValue(point.easting),
        validateValue(point.reducedLocalElevation),
        validateValue(point.enteredRoverHR),
        validateValue(point.enteredHR),

        validateValue(point.STATUS),
        validateValue(point.SATS),

        validateValue(point.PDOP),
        validateValue(point.HDOP),
        validateValue(point.VDOP),
        validateValue(point.HSDV),
        validateValue(point.VSDV),

        validateValue(toUTF(point.startGPSweek, point.startGPStime).date),
        validateValue(toUTF(point.startGPSweek, point.startGPStime).time),
    ];
    data.push(exelArray);
    });

    return data;
};
