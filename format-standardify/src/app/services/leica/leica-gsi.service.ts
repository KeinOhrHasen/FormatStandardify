import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LeicaGsiService {

  constructor() { }

  private splitOnPoints(stringToParse: string){
    let pointsArray = [];
    let splittedOnRows = stringToParse.split('\n');
    splittedOnRows.forEach((row, index) => {
      pointsArray[index] = row.split(' ')
    })
    return pointsArray
  }

  private parsePoints(pointsArr: string[]){
    const CODES = {

      // General information
      '11': 'Pointnumber',
      '12' : 'Instrument serial number',
      '13': 'Instrument type',

      // Angles
      '21': 'Hz',
      '22': 'Vr',

      // distances
      '31': 'Sloping distance',
      '32': 'Horizontal distance',
      '33': 'Height difference',

      // Addicent information for distance
      '51': 'Constants', // ppm, mm
      '52': 'number of measurements, standard deviation',
      '53': 'Average square error',
      '58': 'Prism constant',
      '59': 'PPM', // (1/10 mm)ppm

      // coordinates
      '81': 'X',
      '82': 'Y',
      '83': 'H',
      '84': 'X - Station Easting',
      '85': 'Y - Station Northing',
      '86': 'H - Station Elevation',
      '87': 'Reflector height',
      '88': 'Instrument height',
    }
    // console.log(pointsArr)
    let points = [];
    pointsArr.forEach((point: any ) => {
      // console.log(point);
      let newPoint = {};
      point.forEach((word: string) => {
        let wordId = word.slice(0, 2)
        switch(wordId){
          case '11':
          console.log(CODES[wordId]);
            newPoint[CODES[wordId]] = word.slice(2, 6);
            break
          case '21':
            let numberSting  = word.split('').splice(7, 9);
            let number = +numberSting
            newPoint[CODES['21']] = number;
            break;
        }

      });
      points.push(newPoint);
    });




    return points
  }

  public getParsedData(stringToParse: string){
    let pointArr = this.splitOnPoints(stringToParse);      
    return this.parsePoints(pointArr)
  }
}
