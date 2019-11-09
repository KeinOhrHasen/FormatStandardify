import { Injectable } from '@angular/core';

export interface Point {
  isEmpty: boolean;
  description?: string;
  done?: boolean;
}
export interface Station {
  isEmpty?: boolean;
  description?: string;
  done?: boolean;
}


@Injectable({
  providedIn: 'root'
})
export class TopconService {

  constructor() { }

  private splitOnPoints(stringToParse: string){
    let rowsArray = [];
    let splittedOnRows = stringToParse.split('\n');
    splittedOnRows.forEach((row, index) => {
      if (row !== ""){
        rowsArray[index] = row.split(/ +/)
      }
    })
    console.log(rowsArray)
    return rowsArray
  }

  private parsePoints(pointsArr: string[]){

    let points = [];
    let newStation: Station = {};
    let newPoint: Point = {isEmpty: true};
    let UNITS: Object = {};
    let xyzForStation = true;

    pointsArr.forEach((row: any ) => {


      switch(row[0]){
        case 'UNITS':
          let [linear, anglar] = row[1].split(',')
          UNITS['linear'] = linear;
          UNITS['anglar'] = anglar;
          break

        case 'STN':
          newStation = <Station> new Object();
          xyzForStation = true;
          let [name, height] = row[1].split(',')

          newStation['stationName'] = name;
          newStation['stationHeight'] = height;
          break

        case "BKB":
          let [BKB_Name, BKB_Azimuth, BKB_hz_angle] = row[1].split(',');
          newStation['BKB_Name'] = BKB_Name;
          newStation['BKB_Azimuth'] = BKB_Azimuth;
          newStation['BKB_hz_angle'] = BKB_hz_angle;
          break

        case "BS":
          let [BS_Name, BS_height] = row[1].split(',');
          newStation['BS_Name'] = BS_Name;
          newStation['BS_height'] = BS_height;
          break

        case 'SS':
          if (!newPoint.isEmpty){
            points.push(newPoint)
          }
          newPoint = <Point> new Object();
          xyzForStation = false;
          let [name1, targetHeight, pointCode] = row[1].split(',')

          newPoint['isEmpty'] = false
          newPoint['pointName'] = name1;
          newPoint['pointTargetHeight'] = targetHeight;
          newPoint['pointCode'] = pointCode;
          newPoint['stationName'] = newStation['stationName']
          newPoint['stationHeight'] = newStation['stationHeight']
          newPoint['linearUnit'] = UNITS['linear'];
          newPoint['angularUnit'] = UNITS['anglar'];

          if(newStation['X - Station Easting']){
            newPoint['X - Station Easting'] = newStation['X - Station Easting'];
            newPoint['Y - Station Northing'] = newStation['Y - Station Northing'];
            newPoint['H - Station Elevation'] = newStation['H - Station Elevation'];
          }

          break

        case 'HV':
          let [hzAngle, vrAngle] = row[1].split(',')
          newPoint['HZ'] = hzAngle;
          newPoint['VR'] = vrAngle;
          

          // points.push(newPoint); 
          break

        case 'SD':
          let [hzAngle1, vrAngle1, slopeDistance] = row[1].split(',')
          newPoint['HZ'] = hzAngle1;
          newPoint['VR'] = vrAngle1;
          newPoint['Sloping distance'] = slopeDistance;
          // points.push(newPoint);
          break

        case 'HD':
          let [hzAngle2, s, dH] = row[1].split(',')
          newPoint['HZ'] = hzAngle2;
          newPoint['Horizontal excess'] = s;
          newPoint['Height difference'] = dH;
          // points.push(newPoint);
          break

        case 'XYZ':
          let [x, y, z] = row[1].split(',')

          if (xyzForStation){
            // xyzForStation = false;

            newStation['X - Station Easting'] = x;
            newStation['Y - Station Northing'] = y;
            newStation['H - Station Elevation'] = z;
          }
          else{
            newPoint['X - Target Easting'] = x;
            newPoint['Y - Target Northing'] = y;
            newPoint['H - Target Elevation'] = z;
          }
          break
      }
    })
    
    points.push(newPoint)
    return points
  }
  
  public getParsedData(stringToParse: string){
    let pointArr = this.splitOnPoints(stringToParse);      
    return this.parsePoints(pointArr)
  }

}