export const dataToExel_Leica = function(pointsArray) {
  const data = [[
    'Point Number',
    'Horizontal Angle',
    'Vertical Angle',
    'Sloping distance',
    'Horizontal distance',
    'Height difference',
    'X - Target Easting',
    'Y - Target Northing',
    'H - Target Elevation',
    'X - Station Easting',
    'Y - Station Northing',
    'H - Station Elevation',
    'Reflector height',
    'Instrument height',
    ]];
    pointsArray.forEach((point) => {
      const exelArray = [
        point.Pointnumber,
        point.Hz,
        point.Vr,
        point['Sloping distance']      || '-',
        point['Horizontal distance']   || '-',
        point['Height difference']     || '-',
        point['X - Target Easting']    || '-',
        point['Y - Target Northing']   || '-',
        point['H - Target Elevation']  || '-',
        point['X - Station Easting']   || '-',
        point['Y - Station Northing']  || '-',
        point['H - Station Elevation'] || '-',
        point['Reflector height']      || '-',
        point['Instrument height']     || '-',
      ];
      data.push(exelArray);
    });

    return data;
  };
