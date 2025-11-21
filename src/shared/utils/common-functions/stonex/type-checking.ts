import isNil from 'lodash';

export const validateValue = function (value: any): any {
  if (isNil(value) || isNaN(value)) {
    return '';
  }

  return value;
};
