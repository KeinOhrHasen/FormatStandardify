import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class CarlsonService {

  public headers = ['GP', 'GS', 'GT', 'HS'];

  constructor() { }

  public getParsedData(stringToParse: string) {

    const statoinsArr = this.splitOnStations(stringToParse);
    const pointsArr =   this.splitOnPoints(statoinsArr);
    const readyPoints = this.parsePoints(pointsArr);
    const rolledUpPoints = this.rollUpData(readyPoints);

    return rolledUpPoints;
  }

  private rollUpData(tree) {
    const pointContainer = [];
    tree.stations.forEach(element => {
      // push base point
      pointContainer.push(element[0]);
      element[1].forEach(p => {
        p.antenna_Offset1 = element[0].data.antenna.antennaOffset1;
        pointContainer.push(p);
      });
    });

    return pointContainer;
  }

  private splitOnStations(stringToParse: string) {
    const surveyObject = {
      sessionInfo: [],
      stations: [],
    };
    const splittedOnRows = stringToParse.split('\n');
    let station = [];
    let isCreatingPoint = false;
    let antenna = null;
    let enteredHR = null;
    let enteredRoverHR = null;
    splittedOnRows.forEach((row, index) => {
      // parse session Info
      if (index < 2) {
        surveyObject.sessionInfo.push(row);
      }

      // parse antenna info ofr station
      if (this.trimDashes(row).startsWith('Antenna Type')) {
        antenna = row;
      }
      // parse antenna info ofr station
      if (this.trimDashes(row).startsWith('Entered Rover HR')) {
        enteredRoverHR = row;
      }

      if (row.startsWith('LS')) {
        enteredHR = row;
      }

      // parse station start
      if (row.startsWith('BP')) {
        if (station.length !== 0) {
          surveyObject.stations.push(station);
          station.push(antenna);
          station.push(enteredRoverHR);
          station.push(enteredHR);
        }
        station = [];
        isCreatingPoint = true;
      }

      // add data to station
      if (isCreatingPoint) {
        station.push(row);
      }

    });
    station.push(antenna);
    station.push(enteredRoverHR);
    station.push(enteredHR);
    surveyObject.stations.push(station);
    console.log(surveyObject);

    return surveyObject;
  }

  private splitOnPoints(stationsToParse) {
    const newStations = stationsToParse.stations.map(st => {
      const stObj = {
        genInfo: [],
        points: []
      };
      let point = [];
      let isCreatingPoint = false;
      st.forEach((element, index) => {

        // parce station meta Info
        if (index === 0 || element.includes('LS') || element.includes('Entered Rover') || element.includes('Antenna Type')) {
          stObj.genInfo.push(element);
        }

        // parse point start
        if (element.startsWith('GPS')) {
          point.length !== 0 ? stObj.points.push(point) : null;
          // console.log(point);

          point = [];
          isCreatingPoint = true;
        }

        // add data to station
        if (isCreatingPoint && point.length < 4 && this.headers.includes(this.trimDashes(element).slice(0, 2))) {
          point.push(element);
        }

      });
      stObj.points.push(point);

      // console.log(stObj);

      return stObj;
    });

    stationsToParse.stations = newStations;
    // console.log(stationsToParse);
    return stationsToParse;
  }

  private parsePoints(pointsArr: any) {

    const sessionInfoObject = this.parseSessionInfo(pointsArr.sessionInfo);
    pointsArr.sessionInfo = sessionInfoObject;

    const gpsPoints = this.parseSessionPoints(pointsArr.stations);
    pointsArr.stations = gpsPoints;
    // console.log(pointsArr);

    return pointsArr;
  }

  private parseSessionInfo(sessionInfo: string[]) {
    const infoObj = {};
    sessionInfo.forEach(r => {
      this.trimDashes(r).split(',').forEach(h => {
        const property = this.headerComparator(h);
        property ? infoObj[property.key] = property.value : null;
      });

    });
    return infoObj;
  }

  private parseSessionPoints(stations: any) {
    const newStations = stations.map(s => {
      const basePoint = this.parseBasePoint(s.genInfo);
      const points = s.points.map(p => this.parsePoint(p));

      return [basePoint, points];
    });
    return newStations;
  }


  private parseBasePoint(genInfo: any) {
    const basePointObj = {};
    const enteredHR = genInfo.find(r => this.trimDashes(r).startsWith('LS'));
    const enteredRoverHR = genInfo.find(r => this.trimDashes(r).startsWith('Entered Rover HR'));

    if (enteredHR) {
      basePointObj['enteredHR'] = enteredHR.match(/(\d+.\d+)/)[0];
    }
    if (enteredRoverHR) {
      basePointObj['enteredRoverHR'] = enteredRoverHR.match(/(\d+.\d+)/)[0];
    }

    const reduced = genInfo.reduce((acc, f) => {
      if (f.startsWith('BP') || f.startsWith('LS')) {
        this.trimDashes(f).split(',').forEach(h => {
          const property = this.headerComparator(h);

          property ? acc[property.key] = property.value : null ;
          });
      } else if (f.includes('Antenna Type')) {
        // console.log('found antenna');

        acc['antenna'] = this.getAntennaInfo(f);
      }
      return acc;
      }, {}
    );

    basePointObj['data'] = reduced;
    // console.log(basePointObj);
    return basePointObj;
  }

  private parsePoint(point: string[]) {
    const reduced = point.reduce((acc, f, index) => {
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
              acc[property.key] = property.value;
            }
          }

        });
      return acc;
      }, {}
    );


    return reduced;
  }

  private headerComparator(header: string) {
    switch (header.slice(0, 2)) {
      // session Info
      case 'NM':
        return {key: 'jobName', value: header.slice(2)};
      case 'DT':
        return {key: 'GPSdate', value: header.slice(2)};
      case 'TM':
        return {key: 'GPStime', value: header.slice(2)};
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
        return {key: 'latitude', value: this.toDecimalAngle(header.slice(2))};
      case 'LN':
        return {key: 'longitude', value: this.toDecimalAngle(header.slice(2))};
      case 'EL':
        return {key: 'elevation', value: this.toMeter(header.slice(2))};
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
        return {key: 'northing', value: this.toMeter(header.slice(2))};
      case 'E ':
        return {key: 'easting', value: this.toMeter(header.slice(2))};
      case 'SW':
        return {key: 'startGPSweek', value: header.slice(2)};
      case 'ST':
        return {key: 'startGPStime', value: header.slice(2)};
      case 'EW':
        return {key: 'endGPSweek', value: header.slice(2)};
      case 'ET':
        return {key: 'endGPStime', value: header.slice(2)};

      // antenna data
      case 'RA':
        return {key: 'antenna_Radius', value: header.slice(2, -1)};
      case 'SH':
        return {key: 'antenna_Slant_Height_Measure_Point', value: header.slice(2, -1)};
      case 'L1':
        return {key: 'antenna_Offset1', value: header.slice(2, -1)};
      case 'L2':
        return {key: 'antenna_Offset2', value: header.slice(2, -1)};

      default:
        return null;
    }
  }

  private keyValComparator(header: string) {
    const h = header.split(':');
    return {key: h[0], value: h[1]};
  }

  private trimDashes(row: string): string {
    return row.replace(/^[- ]*|[-, ]*$/g, '');
  }

  private getAntennaInfo(row: string): any {
    // console.log('get antenna');

    const reduced = this.trimDashes(row).split(',').reduce((acc, h) => {
      const property = this.headerComparator(h);
      property ? acc[property.key] = property.value : null ;

      return acc;
    }, {});
    return reduced;
  }

  private toDecimalAngle(angle: string): number {
    return +angle;
  }

  private toMeter(line: string): number {
    return +line;
  }


}
