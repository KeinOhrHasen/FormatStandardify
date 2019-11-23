export interface ICarlson {
    HDOP: number;
    HSDV: number;
    PDOP: number;
    SATS: number;
    STATUS: string;
    VDOP: number;
    VSDV: number;
    antenna_Offset1: number;
    easting: number;
    elevation: number;
    endGPStime: number;
    endGPSweek: number;
    latitude: number;
    longitude: number;
    northing: number;
    pointNumber: string;
    reducedLocalElevation: number;
    startGPStime: number;
    startGPSweek: number;
    data?: any;
    enteredHR: number;
    enteredRoverHR: number;
}
