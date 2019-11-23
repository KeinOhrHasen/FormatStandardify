import * as moment from 'moment';

export const toUTF = function(GPSdate: string, GPStime): any {
    const gpsInit = moment([1980, 0, 6, 0, 0, 0]);
    gpsInit.add(+GPSdate, 'w');
    gpsInit.add(+GPStime / 1000, 's');

    return {
        date: gpsInit.format('DD.MM.YYYY'),
        time: gpsInit.format('HH:mm:ss')
    };
};

export const toCartesian = function (B: number, L: number, H: number) {
    // B, L to radian
    const B_rad = B * Math.PI / 180;
    const L_rad = L * Math.PI / 180;

    // parameters of elipsoid WGS-84
    const f =	0.003352811;
    const a =	6378137.000;

    // additional parameters
    const e2 =	f * (2 - f);
    const W =	(1 - (e2 * (Math.sin(B_rad) ** 2))) ** .5;
    const N =	a / W;

    const X = (H + N) * Math.cos(B_rad) * Math.cos(L_rad);
    const Y =	(H + N) * Math.cos(B_rad) * Math.sin(L_rad);
    const Z =	((N * (1 - e2)) + H) * Math.sin(B_rad);

    return {X, Y, Z};
};
