import { validateValue } from '../common-functions/stonex/type-checking';

export const dataToExel_Leica = function(pointsArray) {
  const data = [[
    'Point Number',
    'Horizontal Anglem, decimal degrees',
    'Vertical Angle, decimal degrees',
    'Sloping distance, m',
    'Instrument height, m',
    'Reflector height, m',
    'Horizontal distance, m',
    'Height difference, m',
    // 'X - Target Easting',
    // 'Y - Target Northing',
    // 'H - Target Elevation',
    // 'X - Station Easting',
    // 'Y - Station Northing',
    // 'H - Station Elevation',
    ]];
    pointsArray.forEach((point) => {
      const exelArray = [
        validateValue(point.Pointnumber),
        validateValue(point.Hz),
        validateValue(point.Vr),
        validateValue(point['Sloping distance']),
        // validateValue(point['X - Target Easting']   ),
        // validateValue(point['Y - Target Northing']  ),
        // validateValue(point['H - Target Elevation'] ),
        // validateValue(point['X - Station Easting']  ),
        // validateValue(point['Y - Station Northing'] ),
        // validateValue(point['H - Station Elevation']),
        validateValue(point['Instrument height']),
        validateValue(point['Reflector height']),
        validateValue(point['Horizontal distance']),
        validateValue(point['Height difference']),
      ];
      data.push(exelArray);
    });

    return data;
  };
