import { UNITS } from '../../constants/leica/units';
import { INPUT_MODE } from '../../constants/leica/input-mode';


// ============ Date =================
// GSI8
export const getDate = function(word: string, length_format: number): string {
    const  dateString = word.slice(-length_format);
    const day = dateString.slice(-8, -6);
    const mounth = dateString.slice(-6, -4);
    const year = dateString.slice(-4);

    return day + '.' + mounth + '.' + year;
};

// GSI8
export const getTime = function(word: string, length_format: number): string {
    const  dateString = word.slice(-length_format);
    const day = dateString.slice(-8, -6);
    const mounth = dateString.slice(-6, -4);
    const hours = dateString.slice(-4, -2);
    const minutes = dateString.slice(-2);

    return day + '.' + mounth + ' ' + hours + ':' + minutes;
};


// ============ INDEXES, UNITS =================
export const trimZeros = function(value: string): string {
    return value.replace(/^0+/, '');
};

export const getAutomaticIndex = function(word) {
    const automaticIndexHZ = word.trim().split('').splice(3, 1)[0];
    if (automaticIndexHZ === '0') {
        return 'OFF';
    }
    if (automaticIndexHZ === '1' || automaticIndexHZ === '3' ) {
        return 'OPERATING';
    }
};

export const getUnitCode = function(survey: string): string {
    return survey.split('').splice(5, 1)[0];
};

export const getInputMode = function(word: string): string {
    const inputModeCode = word.trim().split('').splice(4, 1)[0];
    const mode = INPUT_MODE[inputModeCode];

    return mode;
};

export const getUnitName = function(word: string): string {
    const unit = getUnitCode(word);
    const unitName = UNITS[unit];

    return unitName;
};


// ============ Angels =================
// GSI8
function fromDecimalAngle_ToDecimal(survey: string, divisor: number, format_length: number) {
    const angleArr  = survey.split('').slice(-format_length - 1);
    const angle = +(angleArr[0] + '1') * ( +angleArr.slice(-8).join('') / divisor );

    return angle;
}

// GSI8
function fromSexagesimalAngle_ToDecimal(survey: string, format_length: number) {
    const angleArr  = survey.split('').slice(-format_length - 1);
    const degrees = +angleArr.slice(-8, -5).join('');
    const minutes = +angleArr.slice(-5, -3).join('');
    const seconds = +angleArr.slice(-3).join('') / 10;

    return +(angleArr[0] + '1') * (degrees + minutes / 60 + seconds / 3600);
}

function converteToDecimalDegrees(angle: number, unit: string): number {
    switch (unit) {
        case '2':
            return angle *  0.9;
        case '3':
            return angle;
        case '4':
            return angle;
        case '5':
            return angle *  0.05625;
    }
}

  // GSI8
export const getAngle = function(survey: string, format_length) {
    const unit = getUnitCode(survey);
    let divisor = 100000;

    switch (unit) {
        // for 400 gon decimal
        case '2':
        return converteToDecimalDegrees(fromDecimalAngle_ToDecimal(survey, divisor, format_length), unit);

        // for 360 decimal
        case '3':
        return converteToDecimalDegrees(fromDecimalAngle_ToDecimal(survey, divisor, format_length), unit);

        // for sexagesimal
        case '4':
        return converteToDecimalDegrees(fromSexagesimalAngle_ToDecimal(survey, format_length), unit);

        // for 6400 mil
        case '5':
        return converteToDecimalDegrees(fromDecimalAngle_ToDecimal(survey, divisor = 10000, format_length), unit);
    }
};


// ============ Distance =================
// GSI8, GSI16
export const getDistanceInMt_Ft = function(word, format_length: number): number {
    const unit = getUnitCode(word);
    const numbersArray  = word.trim().split('').slice(-format_length - 1);
    let divisor = 1000;

    if (unit === '6' || unit === '7') {
      divisor = 10000;
    } else if (unit === '8') {
      divisor = 100000;
    }

    const value = +(numbersArray[0] + '1') * ( + +numbersArray.slice(-format_length).join('') / divisor);
    console.log(numbersArray);
    return value;
};
