export const converteToDecimalDegrees = function(angle: number, unit: string): number {
    switch (unit) {
        // for decimal degrees
        case 'D':
            return angle;
        // for degimal gons
        case 'G':
            return angle * 0.9;
    }
};

export const converteToMeters = function(survey: number, unit: string): number {
    switch (unit) {
        // for meters
        case 'M':
            return survey;
        // for feets
        case 'F':
            return survey * 3.280839895;
    }
};
