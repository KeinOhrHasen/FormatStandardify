import { Injectable } from '@angular/core';
import { CODES } from 'src/app/shared/constants/leica/codes';
import {
  trimZeros, getTime, getDate, getAutomaticIndex, getDistanceInMt_Ft, getInputMode, getUnitName, getAngle
  } from 'src/app/shared/common-functions/leica/transformations';

@Injectable({
  providedIn: 'root'
})
export class LeicaGsiService {

  constructor() { }

  private splitOnPoints(stringToParse: string): any {
    const pointsArray: any = [];
    const splittedOnRows: string[] = stringToParse.split('\n');
    splittedOnRows.forEach((row: string, index: number) => {
      pointsArray[index] = row.split(' ');
    });
    return pointsArray;
  }

  private parsePoints(pointsArr: string[]): any {

    const points: any = [];
    pointsArr.forEach((point: any ) => {
      const newPoint = {};
      point.forEach((word: string) => {
        let format_length = 8;
        if (word.length === 23) { format_length = 16; }
        newPoint['Format_name'] = 'GSI' + format_length;
        const wordCode = word.slice(0, 2);

        switch (wordCode) {

          case '11':
            newPoint[CODES[wordCode]] = trimZeros(word.slice(-format_length));
            newPoint['lineNumber'] = word.slice(2, 6);
            break;

          case '12':
            newPoint[CODES[wordCode]] = word.slice(-format_length);
            break;

          case '13':
            newPoint[CODES[wordCode]] = word.slice(-format_length);
            break;

          case '16':
            newPoint[CODES[wordCode]] = trimZeros(word.slice(-format_length));
            break;

          case '17':
            newPoint[CODES[wordCode]] = getDate(word, format_length);
            break;

          case '19':
            newPoint[CODES[wordCode]] = getTime(word, format_length);
            break;


          case '21':
            // Automatic_index_information
            newPoint['Automatic_index_information_HZ'] = getAutomaticIndex(word);

            // input mode
            newPoint[CODES[wordCode] + '_input_mode'] = getInputMode(word);

            // Units
            newPoint[CODES[wordCode] + '_unit'] = getUnitName(word);

            // value information
            newPoint[CODES[wordCode]] = getAngle(word, format_length);

            break;


          case '22':
            // Automatic_index_information
            newPoint['Automatic_index_information_HZ'] = getAutomaticIndex(word);

            // Units
            newPoint[CODES[wordCode] + '_unit'] = getUnitName(word);

            // input mode
            newPoint[CODES[wordCode] + '_input_mode'] = getInputMode(word);

            // value information
            newPoint[CODES[wordCode]] = getAngle(word, format_length);
            break;

          case '31':
            // Units
            newPoint[CODES[wordCode] + '_unit'] = getUnitName(word);

            // input mode
            newPoint[CODES[wordCode] + '_input_mode'] = getInputMode(word);

            // parse Sloping distance to meter or feets
            newPoint[CODES[wordCode]] = getDistanceInMt_Ft(word, format_length);
            break;

          case '32':
            // Units
            newPoint[CODES[wordCode] + '_unit'] = getUnitName(word);

            // input mode
            newPoint[CODES[wordCode] + '_input_mode'] = getInputMode(word);

            // parse Sloping distance to meter or feets
            newPoint[CODES[wordCode]] = getDistanceInMt_Ft(word, format_length);
            break;

          case '33':
            // Units
            newPoint[CODES[wordCode] + '_unit'] = getUnitName(word);

            // input mode
            newPoint[CODES[wordCode] + '_input_mode'] = getInputMode(word);

            // parse Sloping distance to meter or feets
            newPoint[CODES[wordCode]] = getDistanceInMt_Ft(word, format_length);
            break;

          case '41':
            // station ID
            newPoint[CODES[wordCode]] = trimZeros(word.slice(-format_length));
            newPoint['lineNumber'] = word.slice(2, 6);
            break;

          case '42':
            // station name
            newPoint[CODES[wordCode]] = trimZeros(word.slice(-format_length));
            break;

          case '43':
            // station absolute height in meters
            newPoint[CODES[wordCode]] = getDistanceInMt_Ft(word, format_length);
            break;

          case '51':
            const ppmArr  = word.trim().split('').splice(6, 5);
            const prismConstArr = word.split('').splice(12, 5);
            const ppm = +ppmArr.join('');
            const prismConst = +prismConstArr.join('');
            // parse PPM value and prismConst to milimeter
            // console.log(ppm, prismConst )
            newPoint[CODES['58']] = prismConst;
            newPoint[CODES['59']] = ppm;
            break;

          case '58':
            // Units
            newPoint[CODES[wordCode] + '_unit'] = getUnitName(word);

            // input mode
            newPoint[CODES[wordCode] + '_input_mode'] = getInputMode(word);

            // value
            newPoint[CODES[wordCode]] = getDistanceInMt_Ft(word, format_length);
            break;

          case '59':
            // Units
            newPoint[CODES[wordCode] + '_unit'] = getUnitName(word);

            // input mode
            newPoint[CODES[wordCode] + '_input_mode'] = getInputMode(word);

            // value
            newPoint[CODES[wordCode]] = +word.slice(-9) / 10000;
            break;

          case '81':
            // Units
            newPoint[CODES[wordCode] + '_unit'] = getUnitName(word);

            // input mode
            newPoint[CODES[wordCode] + '_input_mode'] = getInputMode(word);

            // parse Sloping distance to meter or feets
            newPoint[CODES[wordCode]] = getDistanceInMt_Ft(word, format_length);
            break;

          case '82':
            // Units
            newPoint[CODES[wordCode] + '_unit'] = getUnitName(word);

            // input mode
            newPoint[CODES[wordCode] + '_input_mode'] = getInputMode(word);

            // parse Sloping distance to meter or feets
            newPoint[CODES[wordCode]] = getDistanceInMt_Ft(word, format_length);
            break;

          case '83':
            // Units
            newPoint[CODES[wordCode] + '_unit'] = getUnitName(word);

            // input mode
            newPoint[CODES[wordCode] + '_input_mode'] = getInputMode(word);

            // parse Sloping distance to meter or feets
            newPoint[CODES[wordCode]] = getDistanceInMt_Ft(word, format_length);
            break;

          case '84':
            // Units
            newPoint[CODES[wordCode] + '_unit'] = getUnitName(word);

            // input mode
            newPoint[CODES[wordCode] + '_input_mode'] = getInputMode(word);

            // parse Sloping distance to meter or feets
            newPoint[CODES[wordCode]] = getDistanceInMt_Ft(word, format_length);
            break;

          case '85':
            // Units
            newPoint[CODES[wordCode] + '_unit'] = getUnitName(word);

            // input mode
            newPoint[CODES[wordCode] + '_input_mode'] = getInputMode(word);

            // parse Sloping distance to meter or feets
            newPoint[CODES[wordCode]] = getDistanceInMt_Ft(word, format_length);
            break;

          case '86':
            // Units
            newPoint[CODES[wordCode] + '_unit'] = getUnitName(word);

            // input mode
            newPoint[CODES[wordCode] + '_input_mode'] = getInputMode(word);

            // parse Sloping distance to meter or feets
            newPoint[CODES[wordCode]] = getDistanceInMt_Ft(word, format_length);
            break;

          case '87':
            // Units
            newPoint[CODES[wordCode] + '_unit'] = getUnitName(word);

            // input mode
            newPoint[CODES[wordCode] + '_input_mode'] = getInputMode(word);

            // parse Sloping distance to meter or feets
            newPoint[CODES[wordCode]] = getDistanceInMt_Ft(word, format_length);
            break;

          case '88':
            // Units
            newPoint[CODES[wordCode] + '_unit'] = getUnitName(word);

            // input mode
            newPoint[CODES[wordCode] + '_input_mode'] = getInputMode(word);

            // parse Sloping distance to meter or feets
            newPoint[CODES[wordCode]] = getDistanceInMt_Ft(word, format_length);
            break;
      }

      });
      points.push(newPoint);
    });

    return points;
  }

  public getParsedData(stringToParse: string): any {
    const pointArr = this.splitOnPoints(stringToParse);
    return this.parsePoints(pointArr);
  }

}
