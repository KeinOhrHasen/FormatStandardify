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
      point.pointName,
      point['stationName']           || '',
      point.HZ                       || '',
      point.VR                       || '',
      point['Sloping distance']      || '',
      point['Instrument Height']      || '',
      point['pointTargetHeight']     || '',
      point['Horizontal excess']     || '',
      point['Height difference']     || '',
      // point['X - Target Easting']    || '',
      // point['Y - Target Northing']   || '',
      // point['H - Target Elevation']  || '',
      // point['X - Station Easting']   || '',
      // point['Y - Station Northing']  || '',
      // point['H - Station Elevation'] || '',
    ];
    data.push(exelArray);
  });

  return data;
};
