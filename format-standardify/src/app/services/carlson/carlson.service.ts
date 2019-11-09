import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarlsonService {

  constructor() { }

  public getParsedData(stringToParse: string){
    let statoinsArr = this.splitOnStations(stringToParse);
    let pointsArr =   this.splitOnPoints(statoinsArr);   
    return this.parsePoints(pointsArr)
  }

  private splitOnStations(stringToParse: string){
    let surveyObject = {
      general: [],
      stations: [],
    };
    let splittedOnRows = stringToParse.split('\n');
    let station = [];
    let isCreatingPoint = false;
    splittedOnRows.forEach((row, index) => {
      // parce general info
      if (index < 2) {
        surveyObject.general.push(row);
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
    console.log(surveyObject)
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

        if (index < 3) {
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
    console.log(stationsToParse);
    return stationsToParse
  }

  private parsePoints(pointsArr: any) {
    return pointsArr;
  }

  parseHead(head: any) {
    return head
  }
}
