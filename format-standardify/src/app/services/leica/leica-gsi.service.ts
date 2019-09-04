import { Injectable } from '@angular/core';
import { CODES } from '../../constants/leica/codes'
import { UNITS } from '../../constants/leica/units';
import { INPUT_MODE } from '../../constants//leica/input-mode';

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

    let points = [];
    pointsArr.forEach((point: any ) => {
      let newPoint = {};
      point.forEach((word: string) => {
        let wordId = word.slice(0, 2)
        switch(wordId){

          case '11':
            newPoint[CODES[wordId]] = word.slice(2, 6);
            break


          case '21':
            // Automatic_index_information
            newPoint['Automatic_index_information_HZ'] = this.getAutomaticIndex(word);
            
            // input mode
            newPoint[CODES['21'] + '_input_mode'] = this.getInputMode(word);
               
            // Units
            newPoint[CODES['21'] + '_unit'] = this.getUnitName(word);
    
            // value information
            newPoint[CODES['21']] = this.getAngle(word);

            break;


          case '22':
            // Automatic_index_information
            newPoint['Automatic_index_information_HZ'] = this.getAutomaticIndex(word);

            // Units
            newPoint[CODES['22'] + '_unit'] = this.getUnitName(word);
            
            // input mode
            newPoint[CODES['22'] + '_input_mode'] = this.getInputMode(word);

            // value information
            newPoint[CODES['22']] = this.getAngle(word);
            break;

          case '31':
            // Units
            newPoint[CODES['31'] + '_unit'] = this.getUnitName(word);

            // input mode
            newPoint[CODES['31'] + '_input_mode'] = this.getInputMode(word);

            // parse Sloping distance to meter or feets
            newPoint[CODES['31']] = this.getDistanceInMt_Ft(word);
            break;

          case '32':
            // Units
            newPoint[CODES['32'] + '_unit'] = this.getUnitName(word);

            // input mode
            newPoint[CODES['32'] + '_input_mode'] = this.getInputMode(word);

            // parse Sloping distance to meter or feets
            newPoint[CODES['32']] = this.getDistanceInMt_Ft(word);
            break;
            
          case '33':
            // Units
            newPoint[CODES['33'] + '_unit'] = this.getUnitName(word);

            // input mode
            newPoint[CODES['33'] + '_input_mode'] = this.getInputMode(word);

            // parse Sloping distance to meter or feets
            newPoint[CODES['33']] = this.getDistanceInMt_Ft(word);
            break;

          case '51':
            let ppmArr  = word.trim().split('').splice(6, 5);
            let prismConstArr = word.split('').splice(12, 5)
            let ppm = +ppmArr.join('');
            let prismConst = +prismConstArr.join('');
            // parse PPM value and prismConst to milimeter
            // console.log(ppm, prismConst )
            newPoint[CODES['58']] = prismConst;
            newPoint[CODES['59']] = ppm;
            break;

          case '81':
            // Units
            newPoint[CODES['81'] + '_unit'] = this.getUnitName(word);

            // input mode
            newPoint[CODES['81'] + '_input_mode'] = this.getInputMode(word);

            // parse Sloping distance to meter or feets
            newPoint[CODES['81']] = this.getDistanceInMt_Ft(word);
            break;

          case '82':
            // Units
            newPoint[CODES['82'] + '_unit'] = this.getUnitName(word);

            // input mode
            newPoint[CODES['82'] + '_input_mode'] = this.getInputMode(word);

            // parse Sloping distance to meter or feets
            newPoint[CODES['82']] = this.getDistanceInMt_Ft(word);
            break;

          case '83':
            // Units
            newPoint[CODES['83'] + '_unit'] = this.getUnitName(word);

            // input mode
            newPoint[CODES['83'] + '_input_mode'] = this.getInputMode(word);

            // parse Sloping distance to meter or feets
            newPoint[CODES['83']] = this.getDistanceInMt_Ft(word);
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

  private getAngle(survey: string){
    let unit = this.getUnitCode(survey);
    let leadingNumber = 3;
    let divisor = 10000;

    if (unit === '5'){
      leadingNumber = 4;
      divisor = 1000;
      return this.getDecimalAngle(survey, leadingNumber, divisor)

    }else if (unit === '4'){
      return this.getSexagesimalAngle(survey)

    } else {
      return this.getDecimalAngle(survey, leadingNumber, divisor)
    }
  }

  private getDecimalAngle(survey: string, leadingNumber :number, divisor:number){
    let angleArr  = survey.split('').splice(7, 9);
    let angle = +angleArr.slice(0, leadingNumber).join('') + +angleArr.slice(leadingNumber, -1).join('')/divisor;

    return angle
  }

  private getSexagesimalAngle(survey: string){
    let angleArr  = survey.split('').slice(6);
    let degrees = +angleArr.slice(0, 4).join('');
    let minutes = +angleArr.slice(4, 6).join('');
    let seconds = +angleArr.slice(6, 8).join('') + (+angleArr.slice(8).join(''))/10;

    return degrees + minutes/60 + seconds/3600
  }

  private getAutomaticIndex(word){
    let automaticIndexHZ = word.trim().split('').splice(3, 1)[0];
    if (automaticIndexHZ === "0"){
      return 'OFF';
    }
    if (automaticIndexHZ === "1" || automaticIndexHZ === "3" ) {
      return 'OPERATING';
    }
  }          

  private getUnitCode(survey){
    // console.log(survey.split('').splice(5, 1)[0])
    return  survey.split('').splice(5, 1)[0];
  }

  private getInputMode(word){
    let inputModeCode = word.trim().split('').splice(4, 1)[0];
    let mode = INPUT_MODE[inputModeCode];

    return mode
  } 

  private getDistanceInMt_Ft(word){
    let unit = this.getUnitCode(word);
    let numbersArray  = word.trim().split('').splice(6, 9);
    let divisor = 1000;

    if (unit === "6" || unit === "7"){
      divisor = 10000;
    }
    else if (unit === "8"){
      divisor = 100000;
    }

    let value = +(numbersArray[0] + '1') * ( + +numbersArray.slice(-8).join('')/divisor);
    return value
  }

  private getUnitName(word){
    let unit = this.getUnitCode(word);
    let unitName = UNITS[unit];
    
    return unitName
  }
 
}
