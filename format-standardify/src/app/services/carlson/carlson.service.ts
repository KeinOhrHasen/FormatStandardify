import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarlsonService {

  constructor() { }

  public getParsedData(stringToParse: string){
    let statoinsArr = this.splitOnStations(stringToParse);
    let pointsArr =   this.splitOnPoints(statoinsArr);  
    this.parsePoints(pointsArr); 
    // return this.parsePoints(pointsArr)
  }

  private splitOnStations(stringToParse: string){
    let surveyObject = {
      sessionInfo: [],
      stations: [],
    };
    let splittedOnRows = stringToParse.split('\n');
    let station = [];
    let isCreatingPoint = false;
    splittedOnRows.forEach((row, index) => {
      // parce session Info 
      if (index < 2) {
        surveyObject.sessionInfo.push(row);
      }

      // parse station start
      if (row.startsWith('BP')) {
        station.length !== 0 ? surveyObject.stations.push(station): null;
        station = [];
        isCreatingPoint =true;
      }

      // add data to station
      if (isCreatingPoint) {
        station.push(row);
      }

    })
    // console.log(surveyObject)
    return surveyObject
  }

  private splitOnPoints(stationsToParse){
    let newStations = stationsToParse.stations.map(st => {
      let stObj = {
        genInfo: [],
        points: []
      };
      let point = [];
      let isCreatingPoint = false;
      st.forEach((element, index) => {

        if (index === 0 || element.includes('LS') || element.includes('Entered Rover')) {
          stObj.genInfo.push(element)
        }

        // parse station start
        if (element.startsWith('GPS')) {
          point.length !== 0 ? stObj.points.push(point): null;
          point = [];
          isCreatingPoint =true;
        }

        // add data to station
        if (isCreatingPoint && point.length < 4) {
          point.push(element);
        }
         
      });
      stObj.points.push(point);

      
      return stObj;
    })

    stationsToParse.stations = newStations;
    // console.log(stationsToParse);
    return stationsToParse
  }

  private parsePoints(pointsArr: any) {

    let sessionInfoObject = this.parseSessionInfo(pointsArr.sessionInfo);
    pointsArr.sessionInfo = sessionInfoObject

    let gpsPoints = this.parseSessionPoints(pointsArr.stations);
    pointsArr.stations = gpsPoints;
    console.log(pointsArr);
    
    return pointsArr;
  }

  trimDashes(row: string) {
    return row.replace(/^[- ]*|[-, ]*$/g, "");
  }

  parseSessionInfo(sessionInfo: string[]) {
    let infoObj = {};
    sessionInfo.forEach(r => {
      this.trimDashes(r).split(',').forEach(h => {
        let property = this.headerComparator(h);       
        property ? infoObj[property.key] = property.value : null;
      });

    })
    return infoObj;
  }

  parseSessionPoints(stations: any) {
    let newStations = stations.map(s => {
      let basePoint = this.parseBasePoint(s.genInfo);
      let points = s.points.map(p => this.parsePoint(p));

      return [basePoint, points];
    })
    return newStations;
  }


  parseBasePoint(genInfo: any) {
    let basePointObj= {};
    let enteredHR = genInfo.find(r => this.trimDashes(r).startsWith('LS'));
    
    if (enteredHR) {
      basePointObj['enteredHR'] = enteredHR.match(/(\d+.\d+)/)[0];
    }

    let reduced = genInfo.reduce((acc, f) => {
      if (f.startsWith('BP') || f.startsWith('LS')) {
        this.trimDashes(f).split(',').forEach(h => {
          let property = this.headerComparator(h);
          
          property ? acc[property.key] = property.value : null ;
          });
        }
      return acc
      }, {}
    );

    basePointObj['data'] = reduced;
    // console.log(basePointObj);
    return basePointObj;
  }

  parsePoint(point) {
    return 'pidar'
  }

  headerComparator(header: string) {   
    switch(header.slice(0, 2)) {
      // session Info
      case 'NM':
        return {key: 'jobName', value: header.slice(2)};
      case 'DT':
        return {key: 'date', value: header.slice(2)};
      case 'TM':
        return {key: 'time', value: header.slice(2)};
      case 'AD':
        return {key: 'southAzimuthDirection', value: header.slice(2)};
      case 'UN':
        return {key: 'distanceUnit', value: header.slice(2)};
      case 'SF':
        return {key: 'scaleFactor', value: header.slice(2)};
      case 'EC':
        return {key: 'isEnabledEarthCurvature', value: header.slice(2)};
      case 'AU':
        return {key: 'angleUnit', value: header.slice(2)};

      // point info
      case 'PN':
        return {key: 'pointNumber', value: header.slice(2)};
      case 'LA':
        return {key: 'latitude', value: header.slice(2)};
      case 'LN':
        return {key: 'longitude', value: header.slice(2)};
      case 'EL':
        return {key: 'elevation', value: header.slice(2)};
      case 'AG':
        return {key: 'antennaToGround', value: header.slice(2)};
      case 'PA':
        return {key: 'phaseCenterToAntenna', value: header.slice(2)};
      case 'AT':
        return {key: 'broadcast_point_Phase_Center_broadcast_coordinate_is_for_PC', value: header.slice(2)};
      case 'SR':
        return {key: 'type_of_LongLINK_network_connection', value: header.slice(2)};
      case 'HR':
        return {key: 'heightOfRod', value: header.slice(2)};
      default:
        return null;
    }
  }
}
