import { Injectable } from '@angular/core';
import { toDecimalAngle, toMeter, trimDashes } from 'src/app/shared/common-functions/stonex/transformations';
import { POINT_HEADERS } from 'src/app/shared/constants/stonex/point-headers';

@Injectable({
  providedIn: 'root'
})
export class CarlsonService {

  public headers = POINT_HEADERS;
  public units = {UN: null, AU: null};

  constructor() { }

  public getParsedData(stringToParse: string) {
    const statoinsArr = this.splitOnStations(stringToParse);
    const pointsArr =   this.splitOnPoints(statoinsArr);
    const readyPoints = this.parsePoints(pointsArr);
    const rolledUpPoints = this.rollUpData(readyPoints);

    return rolledUpPoints;
  }

  private rollUpData(tree: any): any {
    const pointContainer = {softName: tree.sessionInfo.softName, pointsArray: []};

    tree.stations.forEach(element => {
      // push base point
      pointContainer.pointsArray.push(element[0]);
      // push plain points
      element[1].forEach(p => {
        if (element[0].data.antenna) {
          p.antenna_Offset1 = element[0].data.antenna.antenna_Offset1;
        } else {
          p.antenna_Offset1 = element[0].enteredHR - element[0].enteredRoverHR;
        }

        p['enteredHR'] =  element[0].enteredHR;
        p.enteredRoverHR =  element[0].enteredRoverHR;

        pointContainer.pointsArray.push(p);
      });
    });

    return pointContainer;
  }

  private splitOnStations(stringToParse: string): any {
    const surveyObject = { sessionInfo: [], stations: [] };
    const splittedOnRows = stringToParse.split('\n');
    let station = [];
    let isCreatingPoint = false;
    let antenna = null;
    let enteredHR = null;
    let enteredRoverHR = null;
    splittedOnRows.forEach((row, index) => {
      // parse session Info
      if (index < 3) {
        surveyObject.sessionInfo.push(row);
      }

      // parse antenna info ofr station
      if (trimDashes(row).startsWith('Antenna Type')) {
        antenna = row;
      }
      // parse antenna info ofr station
      if (trimDashes(row).startsWith('Entered Rover HR')) {
        enteredRoverHR = row;
      }

      if (row.startsWith('LS')) {
        enteredHR = row;
      }

      // parse station start
      if (row.startsWith('BP') ||
        (row.startsWith('LS') && !splittedOnRows[index - 1].startsWith('BP') && !splittedOnRows[index - 2].startsWith('BP') )) {
        if (station.length !== 0) {
          surveyObject.stations.push(station);

          if (antenna) { station.push(antenna); }
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
    if (antenna) { station.push(antenna); }
    station.push(enteredRoverHR);
    station.push(enteredHR);
    surveyObject.stations.push(station);

    return surveyObject;
  }

  private splitOnPoints(stationsToParse: any): any {
    const newStations = stationsToParse.stations.map(station => {
      const stObj = { genInfo: [], points: [] };
      let point = [];
      let isCreatingPoint = false;
      station.forEach((element, index: number) => {

        // parce station meta Info
        if (index === 0 || element.includes('LS') || element.includes('Entered Rover') || element.includes('Antenna Type')) {
          stObj.genInfo.push(element);
        }

        // parse point start
        if (element.startsWith('GPS')) {
          if (point.length !== 0) { stObj.points.push(point); }
          point = [];
          isCreatingPoint = true;
        }

        // add data to station
        if (isCreatingPoint && point.length < 4 && this.headers.includes(trimDashes(element).slice(0, 2))) {
          point.push(element);
        }

      });
      stObj.points.push(point);

      return stObj;
    });

    stationsToParse.stations = newStations;

    return stationsToParse;
  }

  private parsePoints(pointsArr: any): any {

    const sessionInfoObject = this.parseSessionInfo(pointsArr.sessionInfo);
    pointsArr.sessionInfo = sessionInfoObject;

    const gpsPoints = this.parseSessionPoints(pointsArr.stations);
    pointsArr.stations = gpsPoints;

    return pointsArr;
  }

  private parseSessionInfo(sessionInfo: string[]): any {
    const reduced = sessionInfo.reduce((acc, f, index) => {
      trimDashes(f).split(',').forEach(h => {
        const property = this.headerComparator(h);

        // fix me
        if (property) {
          acc[property.key] = property.value;
          if (h.slice(0, 2) === 'UN' || h.slice(0, 2) === 'AU') {
            this.units[h.slice(0, 2)] = property.value;
          }
        }

        // === work just for two software type ! ===
        if (index === 2) {
          acc['softName'] = f.match(/(SurvCE)|(Cube-A)/)[1] || f.match(/(SurvCE)|(Cube-A)/)[2];
        }

        });
        return acc;
      }, {}
    );

    return reduced;
  }

  private parseSessionPoints(stations: any): any {
    const newStations = stations.map(s => {
      const basePoint = this.parseBasePoint(s.genInfo);
      const points = s.points.map(p => this.parsePoint(p));

      return [basePoint, points];
    });
    return newStations;
  }


  private parseBasePoint(genInfo: any): any {
    const basePointObj = {};
    const enteredHR = genInfo.find(r => trimDashes(r).startsWith('LS'));
    const enteredRoverHR = genInfo.find(r => trimDashes(r).startsWith('Entered Rover HR'));

    if (enteredHR) {
      basePointObj['enteredHR'] = enteredHR.match(/(\d+.\d+)/)[0];
    }
    if (enteredRoverHR) {
      basePointObj['enteredRoverHR'] = enteredRoverHR.match(/(\d+.\d+)/)[0];
    }

    const reduced = genInfo.reduce((acc, f) => {
      if (f.startsWith('BP') || f.startsWith('LS')) {
        trimDashes(f).split(',').forEach(h => {
          const property = this.headerComparator(h);

          if (property) { acc[property.key] = property.value; }
          });
      } else if (f.includes('Antenna Type')) {
        acc['antenna'] = this.getAntennaInfo(f);
      }
      return acc;
      }, {}
    );

    basePointObj['data'] = reduced;

    return basePointObj;
  }

  private parsePoint(point: string[]): any {
    const reduced = point.reduce((acc, f, index) => {
        trimDashes(f).split(/,[ ]*/).forEach(h => {

          let property;
          if (index === 3) {
            property = this.keyValComparator(h);
          } else {
            property = this.headerComparator(h);
          }

          if (property) {
            if (trimDashes(f).startsWith('GS') && h.startsWith('EL')) {
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

  private headerComparator(header: string): any {
    switch (header.slice(0, 2)) {
      // session Info
      case 'NM':
        return {key: 'jobName', value: header.slice(2)};
      case 'DT':
        return {key: 'GPSdate', value: header.slice(2)};
      case 'TM':
        return {key: 'GPStime', value: header.slice(2)};
      case 'AD':
        return {key: 'southAzimuthDirection', value: +header.slice(2)};
      case 'UN':
        return {key: 'distanceUnit', value: +header.slice(2)};
      case 'SF':
        return {key: 'scaleFactor', value: +header.slice(2)};
      case 'EC':
        return {key: 'isEnabledEarthCurvature', value: +header.slice(2)};
      case 'EO':
        return {key: 'ElectronicDistanceMeasuringOffset', value: +header.slice(2)};
      case 'AU':
        return {key: 'angleUnit', value: +header.slice(2)};

      // Base point info
      case 'PN':
        return {key: 'pointNumber', value: header.slice(2)};
      case 'LA':
        return {key: 'latitude', value: toDecimalAngle(header.slice(2), this.units)};
      case 'LN':
        return {key: 'longitude', value: toDecimalAngle(header.slice(2), this.units)};
      case 'EL':
        return {key: 'elevation', value: +header.slice(2)};
      case 'AG':
        return {key: 'antennaToGround', value: header.slice(2)};
      case 'PA':
        return {key: 'phaseCenterToAntenna', value: header.slice(2)};
      case 'AT':
        return {key: 'broadcast_point_Phase_Center_broadcast_coordinate_is_for_PC', value: header.slice(2)};
      case 'SR':
        return {key: 'type_of_LongLINK_network_connection', value: header.slice(2)};
      case 'HR':
        return {key: 'heightOfRod', value: toMeter(+header.slice(2), this.units)};

      // Point info - Reduced local coordinate from GPS record and localization data
      case 'N ':
        return {key: 'northing', value: toMeter(+header.slice(2), this.units)};
      case 'E ':
        return {key: 'easting', value: toMeter(+header.slice(2), this.units)};
      case 'SW':
        return {key: 'startGPSweek', value: +header.slice(2)};
      case 'ST':
        return {key: 'startGPStime', value: +header.slice(2)};
      case 'EW':
        return {key: 'endGPSweek', value: +header.slice(2)};
      case 'ET':
        return {key: 'endGPStime', value: +header.slice(2)};

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

  private keyValComparator(header: string): any {
    const h = header.split(':');
    return {key: h[0], value: h[1]};
  }

  private getAntennaInfo(row: string): any {
    const reduced = trimDashes(row).split(',').reduce((acc, h) => {
      const property = this.headerComparator(h);
      if (property) { acc[property.key] = property.value; }
      return acc;
    }, {});
    return reduced;
  }

}
