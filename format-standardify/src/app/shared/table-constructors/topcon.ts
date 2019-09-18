export const dataToExel_Topcon = function(pointsArray){
  let data = [[
  "Point Number",
  "Station Name",
  "Station Height",
  "Horizontal Angle",
  "Vertical Angle",
  "Sloping distance",
  "Horizontal excess",
  "Height difference",
  "X - Target Easting",
  "Y - Target Northing",
  "H - Target Elevation",
  "X - Station Easting",
  "Y - Station Northing",
  "H - Station Elevation",
  ]];
  pointsArray.forEach((point) => {
    let exelArray = [
      point.pointName,
      point["stationName"],
      point["stationHeight"],
      point.HZ                       || '-',
      point.VR                       || '-',
      point["Sloping distance"]      || '-',
      point["Horizontal excess"]     || '-',
      point["Height difference"]     || '-',
      point["X - Target Easting"]    || '-',
      point["Y - Target Northing"]   || '-',
      point["H - Target Elevation"]  || '-',
      point["X - Station Easting"]   || '-',
      point["Y - Station Northing"]  || '-',
      point["H - Station Elevation"] || '-',
    ];
    data.push(exelArray)
  })

  return data
}