export const validateValue = function(value: any): any {
    if (value !== null && value !== undefined && value === value) {
        return value;
    }
    return '';
};
