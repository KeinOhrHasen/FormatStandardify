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
        let format_length: number = 8;
        word.length === 23 ? format_length = 16 : null;
        newPoint['Format_name'] = 'GSI' + format_length;
        let wordCode = word.slice(0, 2);

        switch(wordCode){

          case '11':
            newPoint[CODES[wordCode]] = this.trimZeros(word.slice(-format_length));
            newPoint['lineNumber'] = word.slice(2, 6);
            break

          case '12':
            newPoint[CODES[wordCode]] = word.slice(-format_length);
            break

          case '13':
            newPoint[CODES[wordCode]] = word.slice(-format_length);
            break

          case '16':
            newPoint[CODES[wordCode]] = this.trimZeros(word.slice(-format_length));
            break

          case '17':
            newPoint[CODES[wordCode]] = this.getDate(word, format_length);
            break

          case '19':
            newPoint[CODES[wordCode]] = this.getTime(word, format_length);
            break

          


          case '21':
            // Automatic_index_information
            newPoint['Automatic_index_information_HZ'] = this.getAutomaticIndex(word);
            
            // input mode
            newPoint[CODES[wordCode] + '_input_mode'] = this.getInputMode(word);
               
            // Units
            newPoint[CODES[wordCode] + '_unit'] = this.getUnitName(word);
    
            // value information
            newPoint[CODES[wordCode]] = this.getAngle(word, format_length);

            break;


          case '22':
            // Automatic_index_information
            newPoint['Automatic_index_information_HZ'] = this.getAutomaticIndex(word);

            // Units
            newPoint[CODES[wordCode] + '_unit'] = this.getUnitName(word);
            
            // input mode
            newPoint[CODES[wordCode] + '_input_mode'] = this.getInputMode(word);

            // value information
            newPoint[CODES[wordCode]] = this.getAngle(word, format_length);
            break;

          case '31':
            // Units
            newPoint[CODES[wordCode] + '_unit'] = this.getUnitName(word);

            // input mode
            newPoint[CODES[wordCode] + '_input_mode'] = this.getInputMode(word);

            // parse Sloping distance to meter or feets
            newPoint[CODES[wordCode]] = this.getDistanceInMt_Ft(word, format_length);
            break;

          case '32':
            // Units
            newPoint[CODES[wordCode] + '_unit'] = this.getUnitName(word);

            // input mode
            newPoint[CODES[wordCode] + '_input_mode'] = this.getInputMode(word);

            // parse Sloping distance to meter or feets
            newPoint[CODES[wordCode]] = this.getDistanceInMt_Ft(word, format_length);
            break;
            
          case '33':
            // Units
            newPoint[CODES[wordCode] + '_unit'] = this.getUnitName(word);

            // input mode
            newPoint[CODES[wordCode] + '_input_mode'] = this.getInputMode(word);

            // parse Sloping distance to meter or feets
            newPoint[CODES[wordCode]] = this.getDistanceInMt_Ft(word, format_length);
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

          case '58':
            // Units
            newPoint[CODES[wordCode] + '_unit'] = this.getUnitName(word);

            // input mode
            newPoint[CODES[wordCode] + '_input_mode'] = this.getInputMode(word);

            // value
            newPoint[CODES[wordCode]] = this.getDistanceInMt_Ft(word, format_length);
            break;

          case '59':
            // Units
            newPoint[CODES[wordCode] + '_unit'] = this.getUnitName(word);

            // input mode
            newPoint[CODES[wordCode] + '_input_mode'] = this.getInputMode(word);

            // value
            newPoint[CODES[wordCode]] = +word.slice(-9)/10000;
            break;

          case '81':
            // Units
            newPoint[CODES[wordCode] + '_unit'] = this.getUnitName(word);

            // input mode
            newPoint[CODES[wordCode] + '_input_mode'] = this.getInputMode(word);

            // parse Sloping distance to meter or feets
            newPoint[CODES[wordCode]] = this.getDistanceInMt_Ft(word, format_length);
            break;

          case '82':
            // Units
            newPoint[CODES[wordCode] + '_unit'] = this.getUnitName(word);

            // input mode
            newPoint[CODES[wordCode] + '_input_mode'] = this.getInputMode(word);

            // parse Sloping distance to meter or feets
            newPoint[CODES[wordCode]] = this.getDistanceInMt_Ft(word, format_length);
            break;

          case '83':
            // Units
            newPoint[CODES[wordCode] + '_unit'] = this.getUnitName(word);

            // input mode
            newPoint[CODES[wordCode] + '_input_mode'] = this.getInputMode(word);

            // parse Sloping distance to meter or feets
            newPoint[CODES[wordCode]] = this.getDistanceInMt_Ft(word, format_length);
            break;

          case '84':
            // Units
            newPoint[CODES[wordCode] + '_unit'] = this.getUnitName(word);

            // input mode
            newPoint[CODES[wordCode] + '_input_mode'] = this.getInputMode(word);

            // parse Sloping distance to meter or feets
            newPoint[CODES[wordCode]] = this.getDistanceInMt_Ft(word, format_length);
            break;

          case '85':
            // Units
            newPoint[CODES[wordCode] + '_unit'] = this.getUnitName(word);

            // input mode
            newPoint[CODES[wordCode] + '_input_mode'] = this.getInputMode(word);

            // parse Sloping distance to meter or feets
            newPoint[CODES[wordCode]] = this.getDistanceInMt_Ft(word, format_length);
            break;

          case '86':
            // Units
            newPoint[CODES[wordCode] + '_unit'] = this.getUnitName(word);

            // input mode
            newPoint[CODES[wordCode] + '_input_mode'] = this.getInputMode(word);

            // parse Sloping distance to meter or feets
            newPoint[CODES[wordCode]] = this.getDistanceInMt_Ft(word, format_length);
            break;

          case '87':
            // Units
            newPoint[CODES[wordCode] + '_unit'] = this.getUnitName(word);

            // input mode
            newPoint[CODES[wordCode] + '_input_mode'] = this.getInputMode(word);

            // parse Sloping distance to meter or feets
            newPoint[CODES[wordCode]] = this.getDistanceInMt_Ft(word, format_length);
            break;
            
          case '88':
            // Units
            newPoint[CODES[wordCode] + '_unit'] = this.getUnitName(word);

            // input mode
            newPoint[CODES[wordCode] + '_input_mode'] = this.getInputMode(word);

            // parse Sloping distance to meter or feets
            newPoint[CODES[wordCode]] = this.getDistanceInMt_Ft(word, format_length);
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

  // GSI8
  private getAngle(survey: string, format_length){
    let unit = this.getUnitCode(survey);
    let divisor = 100000;

    if (unit === '5'){
      divisor = 10000;
      return this.getDecimalAngle(survey, divisor, format_length)

    }else if (unit === '4'){
      return this.getSexagesimalAngle(survey, format_length)

    } else {
      return this.getDecimalAngle(survey, divisor, format_length)
    }
  }

  // GSI8
  private getDecimalAngle(survey: string, divisor:number, format_length:number){
    let angleArr  = survey.split('').slice(-format_length-1);
    let angle = +(angleArr[0] + '1') * ( +angleArr.slice(-8).join('')/divisor );

    return angle
  }

  // GSI8
  private getSexagesimalAngle(survey: string, format_length:number){
    let angleArr  = survey.split('').slice(-format_length-1);
    let degrees = +angleArr.slice(-8, -5).join('');
    let minutes = +angleArr.slice(-5, -3).join('');
    let seconds = +angleArr.slice(-3).join('')/10;

    return +(angleArr[0] + '1') * (degrees + minutes/60 + seconds/3600)
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
    return  survey.split('').splice(5, 1)[0];
  }

  private getInputMode(word){
    let inputModeCode = word.trim().split('').splice(4, 1)[0];
    let mode = INPUT_MODE[inputModeCode];

    return mode
  } 

  // GSI8, GSI16
  private getDistanceInMt_Ft(word, format_length: number){
    let unit = this.getUnitCode(word);
    let numbersArray  = word.trim().split('').slice(-format_length-1);
    let divisor = 1000;

    if (unit === "6" || unit === "7"){
      divisor = 10000;
    }
    else if (unit === "8"){
      divisor = 100000;
    }

    let value = +(numbersArray[0] + '1') * ( + +numbersArray.slice(-format_length).join('')/divisor);
    console.log(numbersArray)
    return value
  }

  private getUnitName(word){
    let unit = this.getUnitCode(word);
    let unitName = UNITS[unit];
    
    return unitName
  }

  // GSI8
  private getDate(word, length_format){
   let  dateString = word.slice(-length_format);
   let day = dateString.slice(-8, -6);
   let mounth = dateString.slice(-6, -4);
   let year = dateString.slice(-4);

   return day + '.' + mounth + '.' + year
  }

   // GSI8
  private getTime(word, length_format){
    let  dateString = word.slice(-length_format);
    let day = dateString.slice(-8, -6);
    let mounth = dateString.slice(-6, -4);
    let hours = dateString.slice(-4, -2);
    let minutes = dateString.slice(-2);

    return day + '.' + mounth + ' ' + hours + ":" + minutes
  }
  
  private trimZeros(value: string){
    return value.replace(/^0+/, '')
  }
 
}
