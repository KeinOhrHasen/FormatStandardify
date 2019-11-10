import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarlsonService {

  constructor() { }

  public getParsedData(stringToParse: string){
    let statoinsArr = this.splitOnStations(stringToParse);
    let pointsArr =   this.splitOnPoints(statoinsArr);
    let readyPoints = this.parsePoints(pointsArr);

    return this.rollUpData(readyPoints);
  }

  private rollUpData(tree) {
    let pointContainer = [];
    tree.stations.forEach(element => {
      // push base point
      pointContainer.push(element[0]);
      element[1].forEach(p => {
        pointContainer.push(p);
      });
    });

    return pointContainer
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
    // console.log(pointsArr);
    
    return pointsArr;
  }

  private trimDashes(row: string) {
    return row.replace(/^[- ]*|[-, ]*$/g, "");
  }

  private parseSessionInfo(sessionInfo: string[]) {
    let infoObj = {};
    sessionInfo.forEach(r => {
      this.trimDashes(r).split(',').forEach(h => {
        let property = this.headerComparator(h);       
        property ? infoObj[property.key] = property.value : null;
      });

    })
    return infoObj;
  }

  private parseSessionPoints(stations: any) {
    let newStations = stations.map(s => {
      let basePoint = this.parseBasePoint(s.genInfo);
      let points = s.points.map(p => this.parsePoint(p));

      return [basePoint, points];
    })
    return newStations;
  }


  private parseBasePoint(genInfo: any) {
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

  private parsePoint(point: string[]) {
    let reduced = point.reduce((acc, f, index) => {
        this.trimDashes(f).split(/,[ ]*/).forEach(h => {

          let property;
          if (index === 3) {
            property = this.keyValComparator(h);
          } else {
            property = this.headerComparator(h);
          }

          if (property) {
            if (this.trimDashes(f).startsWith('GS') && h.startsWith('EL')) {
              acc['reducedLocalElevation'] = property.value;
            } else {
              acc[property.key] = property.value
            }
          }

        });
      return acc
      }, {}
    );


    return reduced
  }

  private headerComparator(header: string){   
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

      // Base point info
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
      
        // Point info - Reduced local coordinate from GPS record and localization data
      case 'N ':
        return {key: 'northing', value: header.slice(2)};
      case 'E ':
        return {key: 'easting', value: header.slice(2)};
      case 'SW':
        return {key: 'startGPSweek', value: header.slice(2)};
      case 'ST':
        return {key: 'startGPStime', value: header.slice(2)};
      case 'EW':
        return {key: 'endGPSweek', value: header.slice(2)};
      case 'ET':
        return {key: 'endGPStime', value: header.slice(2)};
      
      default:
        return null;
    }
  }

  private keyValComparator(header: string) {
    let h = header.split(':');
    return {key: h[0], value: h[1]};
  }
}
