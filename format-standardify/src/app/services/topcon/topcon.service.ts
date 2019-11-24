import { Injectable } from '@angular/core';
import { Station } from 'src/app/shared/interfaces/topcon/station.model';
import { Point } from 'src/app/shared/interfaces/topcon/point.model';
import { converteToMeters, converteToDecimalDegrees } from 'src/app/shared/common-functions/topcon/transformations';

@Injectable({
    providedIn: 'root'
})
export class TopconService {

    constructor() { }

    private splitOnPoints(stringToParse: string): any {
        const rowsArray: any = [];
        const splittedOnRows: any = stringToParse.split('\n');
        splittedOnRows.forEach((row: string, index: number) => {
            if (row !== '') {
                rowsArray[index] = row.split(/ +/);
            }
        });

        return rowsArray;
    }

    private parsePoints(pointsArr: string[]): any {

        const points = [];
        let newStation: Station = {};
        let newPoint: Point = {isEmpty: true};
        const UNITS: any = {};
        let xyzForStation = true;

        pointsArr.forEach((row: any ) => {

        switch (row[0]) {
            case 'UNITS':
                const [linear, anglar] = row[1].split(',');
                UNITS['linear'] = linear;
                UNITS['angular'] = anglar;
                break;

            case 'STN':
                newStation = <Station> new Object();
                xyzForStation = true;
                const [name, height] = row[1].split(',');

                newStation['stationName'] = name;
                newStation['stationHeight'] = converteToMeters(height, UNITS.linear);
                break;

            case 'BKB':
                const [BKB_Name, BKB_Azimuth, BKB_hz_angle] = row[1].split(',');
                newStation['BKB_Name'] = BKB_Name;
                newStation['BKB_Azimuth'] = converteToDecimalDegrees(BKB_Azimuth, UNITS.angular);
                newStation['BKB_hz_angle'] = converteToDecimalDegrees(BKB_hz_angle, UNITS.angular);
                break;

            case 'BS':
                const [BS_Name, BS_height] = row[1].split(',');
                newStation['BS_Name'] = BS_Name;
                newStation['BS_height'] =  converteToMeters(BS_height, UNITS.linear);
                break;

            case 'SS':
                if (!newPoint.isEmpty) {
                    points.push(newPoint);
                }
                newPoint = <Point> new Object();
                xyzForStation = false;
                const [name1, targetHeight, pointCode] = row[1].split(',');

                newPoint['isEmpty'] = false;
                newPoint['pointName'] = name1;
                newPoint['pointTargetHeight'] = converteToMeters(targetHeight, UNITS.linear);
                newPoint['pointCode'] = pointCode;
                newPoint['stationName'] = newStation['stationName'];
                newPoint['stationHeight'] = newStation['stationHeight'];
                newPoint['linearUnit'] = UNITS['linear'];
                newPoint['angularUnit'] = UNITS['angular'];

                if (newStation['X - Station Easting']) {
                    newPoint['X - Station Easting'] = newStation['X - Station Easting'];
                    newPoint['Y - Station Northing'] = newStation['Y - Station Northing'];
                    newPoint['H - Station Elevation'] = newStation['H - Station Elevation'];
                }
                break;

            case 'HV':
                const [hzAngle, vrAngle] = row[1].split(',');
                newPoint['HZ'] = hzAngle;
                newPoint['VR'] = vrAngle;
                break;

            case 'SD':
                const [hzAngle1, vrAngle1, slopeDistance] = row[1].split(',');
                newPoint['HZ'] = hzAngle1;
                newPoint['VR'] = vrAngle1;
                newPoint['Sloping distance'] = converteToMeters(slopeDistance, UNITS.linear);
                break;

            case 'HD':
                const [hzAngle2, s, dH] = row[1].split(',');
                newPoint['HZ'] = hzAngle2;
                newPoint['Horizontal excess'] = converteToMeters(s, UNITS.linear);
                newPoint['Height difference'] = converteToMeters(dH, UNITS.linear);
                break;

            case 'XYZ':
                const [x, y, z] = row[1].split(',');

                if (xyzForStation) {
                    newStation['X - Station Easting'] = converteToMeters(x, UNITS.linear);
                    newStation['Y - Station Northing'] = converteToMeters(y, UNITS.linear);
                    newStation['H - Station Elevation'] = converteToMeters(z, UNITS.linear);
                } else {
                    newPoint['X - Target Easting'] = converteToMeters(x, UNITS.linear);
                    newPoint['Y - Target Northing'] = converteToMeters(y, UNITS.linear);
                    newPoint['H - Target Elevation'] = converteToMeters(z, UNITS.linear);
                }
                break;
        }
        });

        points.push(newPoint);
        return points;
    }

    public getParsedData(stringToParse: string): any {
        const pointArr = this.splitOnPoints(stringToParse);
        return this.parsePoints(pointArr);
    }

}
