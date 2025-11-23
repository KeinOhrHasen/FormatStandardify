import isNil from 'lodash';

export const validateValue = (value: number | string | undefined | null): number | string => {
  if (value === undefined || value === null) {
    return '';
  }

  return value;
};
