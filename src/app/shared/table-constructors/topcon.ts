import { validateValue } from '../common-functions/stonex/type-checking';

export const dataToExel_Topcon = function(pointsArray) {
  const data = [[
  'Point Number',
  'Station Name',
  'Horizontal Angle, decimal degrees',
  'Vertical Angle, decimal degrees',
  'Sloping distance, m',
  'Instrument Height, m',
  'Target Height, m',
  'Horizontal excess, m',
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
      validateValue(point.pointName),
      validateValue(point['stationName']),
      validateValue(point.HZ),
      validateValue(point.VR),
      validateValue(point['Sloping distance']),
      validateValue(point['Instrument Height']),
      validateValue(point['pointTargetHeight']),
      validateValue(point['Horizontal excess']),
      validateValue(point['Height difference']),
      // validateValue(point['X - Target Easting']   ),
      // validateValue(point['Y - Target Northing']  ),
      // validateValue(point['H - Target Elevation'] ),
      // validateValue(point['X - Station Easting']  ),
      // validateValue(point['Y - Station Northing'] ),
      // validateValue(point['H - Station Elevation']),
    ];
    data.push(exelArray);
  });

  return data;
};
