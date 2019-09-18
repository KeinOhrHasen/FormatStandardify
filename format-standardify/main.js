(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app-routing.module.ts":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");



var routes = [];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forRoot(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());



/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "form,\r\n.pick-format{\r\n    background-color: aquamarine;\r\n    padding: 2rem;\r\n    margin: 2rem auto;\r\n    width: 50%;\r\n    border-radius: 10px;\r\n}\r\n.example-radio-button{\r\n    display: block;\r\n    margin: 1rem;\r\n}\r\nform input{\r\n    margin: 1rem;\r\n}\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYXBwLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0lBRUksNkJBQTZCO0lBQzdCLGNBQWM7SUFDZCxrQkFBa0I7SUFDbEIsV0FBVztJQUNYLG9CQUFvQjtDQUN2QjtBQUNEO0lBQ0ksZUFBZTtJQUNmLGFBQWE7Q0FDaEI7QUFFRDtJQUNJLGFBQWE7Q0FDaEIiLCJmaWxlIjoic3JjL2FwcC9hcHAuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbImZvcm0sXHJcbi5waWNrLWZvcm1hdHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IGFxdWFtYXJpbmU7XHJcbiAgICBwYWRkaW5nOiAycmVtO1xyXG4gICAgbWFyZ2luOiAycmVtIGF1dG87XHJcbiAgICB3aWR0aDogNTAlO1xyXG4gICAgYm9yZGVyLXJhZGl1czogMTBweDtcclxufVxyXG4uZXhhbXBsZS1yYWRpby1idXR0b257XHJcbiAgICBkaXNwbGF5OiBibG9jaztcclxuICAgIG1hcmdpbjogMXJlbTtcclxufVxyXG5cclxuZm9ybSBpbnB1dHtcclxuICAgIG1hcmdpbjogMXJlbTtcclxufSJdfQ== */"

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<form [formGroup]=\"formGroup\" novalidate (ngSubmit)=\"onSubmit()\">\r\n  <input type=\"file\" (change)=\"onFileChange($event)\" /> <br>\r\n  <button mat-button color=\"primary\" type=\"submit\" [disabled]=\"formGroup.invalid || formGroup.prestine\">Submit</button>\r\n  <button mat-button color=\"primary\" type=\"button\" [disabled]=\"formGroup.invalid || formGroup.prestine\" (click)=\"saveFile()\">Save file</button>\r\n  <button mat-button color=\"primary\" type=\"button\" (click)=\"creeteXLSX()\">Save EXEL file</button>\r\n</form>\r\n\r\n<div class=\"pick-format\">\r\n  <label id=\"example-radio-group-label\">Pick your favorite format</label>\r\n  <mat-radio-group\r\n    aria-labelledby=\"example-radio-group-label\"\r\n    class=\"example-radio-group\"\r\n    [(ngModel)]=\"choosenFormat\">\r\n    <mat-radio-button class=\"example-radio-button\" *ngFor=\"let format of all_formats\" [value]=\"format\">\r\n      {{format}}\r\n    </mat-radio-button>\r\n  </mat-radio-group>\r\n  <div>Choosed format is: {{choosenFormat}}</div>\r\n</div>\r\n\r\n\r\n<table class=\"sjs-table\">\r\n  <tr *ngFor=\"let row of data\">\r\n    <td *ngFor=\"let val of row\">\r\n      {{val}}\r\n    </td>\r\n  </tr>\r\n</table>\r\n\r\n<router-outlet></router-outlet>\r\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var xlsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! xlsx */ "./node_modules/xlsx/xlsx.js");
/* harmony import */ var xlsx__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(xlsx__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _services_leica_leica_gsi_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./services/leica/leica-gsi.service */ "./src/app/services/leica/leica-gsi.service.ts");
/* harmony import */ var _services_topcon_topcon_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./services/topcon/topcon.service */ "./src/app/services/topcon/topcon.service.ts");
/* harmony import */ var _shared_table_constructors_leica__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./shared/table-constructors/leica */ "./src/app/shared/table-constructors/leica.ts");
/* harmony import */ var _shared_table_constructors_topcon__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./shared/table-constructors/topcon */ "./src/app/shared/table-constructors/topcon.ts");








var AppComponent = /** @class */ (function () {
    function AppComponent(fb, cd, leicaGsiService, topconService) {
        this.fb = fb;
        this.cd = cd;
        this.leicaGsiService = leicaGsiService;
        this.topconService = topconService;
        this.all_formats = ['.gsi', 'rts-6'];
        this.formGroup = this.fb.group({
            file: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]
        });
    }
    AppComponent.prototype.onFileChange = function (event) {
        var _this = this;
        var reader = new FileReader();
        if (event.target.files && event.target.files.length) {
            var file = event.target.files[0];
            reader.readAsText(file);
            reader.onload = function () {
                _this.formGroup.patchValue({
                    file: reader.result
                });
                // need to run CD since file load runs outside of zone
                _this.cd.markForCheck();
            };
        }
    };
    AppComponent.prototype.onSubmit = function () {
        // console.log(this.formGroup.value);
        if (this.choosenFormat === '.gsi') {
            this.points = this.leicaGsiService.getParsedData(this.formGroup.value.file);
        }
        else if (this.choosenFormat === 'rts-6') {
            this.points = this.topconService.getParsedData(this.formGroup.value.file);
        }
        this.points.forEach(function (row) { return console.log(row); });
        // console.log(resultArray);
    };
    AppComponent.prototype.saveFile = function () {
        var text = this.formGroup.value.file;
        var textToSaveAsBlob = new Blob([text], { type: "text/plain" });
        var textToSaveAsURL = window.URL.createObjectURL(textToSaveAsBlob);
        var fileNameToSaveAs = 'result';
        var downloadLink = document.createElement("a");
        downloadLink.download = fileNameToSaveAs;
        downloadLink.innerHTML = "Download File";
        downloadLink.href = textToSaveAsURL;
        downloadLink.style.display = "none";
        document.body.appendChild(downloadLink);
        downloadLink.click();
    };
    // xlsx part ------------------------------------------------
    AppComponent.prototype.dataToExel = function (pointsArray) {
        if (this.choosenFormat === '.gsi') {
            return Object(_shared_table_constructors_leica__WEBPACK_IMPORTED_MODULE_6__["dataToExel_Leica"])(pointsArray);
        }
        else if (this.choosenFormat === 'rts-6') {
            return Object(_shared_table_constructors_topcon__WEBPACK_IMPORTED_MODULE_7__["dataToExel_Topcon"])(pointsArray);
        }
    };
    AppComponent.prototype.creeteXLSX = function () {
        /* generate worksheet */
        var ws = xlsx__WEBPACK_IMPORTED_MODULE_3__["utils"].aoa_to_sheet(this.dataToExel(this.points));
        /* generate workbook and add the worksheet */
        var wb = xlsx__WEBPACK_IMPORTED_MODULE_3__["utils"].book_new();
        xlsx__WEBPACK_IMPORTED_MODULE_3__["utils"].book_append_sheet(wb, ws, 'Sheet1');
        /* save to file */
        xlsx__WEBPACK_IMPORTED_MODULE_3__["writeFile"](wb, 'SheetJS.xlsx');
    };
    AppComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"],
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"],
            _services_leica_leica_gsi_service__WEBPACK_IMPORTED_MODULE_4__["LeicaGsiService"],
            _services_topcon_topcon_service__WEBPACK_IMPORTED_MODULE_5__["TopconService"]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app-routing.module */ "./src/app/app-routing.module.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_material_radio__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/radio */ "./node_modules/@angular/material/esm5/radio.es5.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/button */ "./node_modules/@angular/material/esm5/button.es5.js");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/input */ "./node_modules/@angular/material/esm5/input.es5.js");










var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
                _app_routing_module__WEBPACK_IMPORTED_MODULE_3__["AppRoutingModule"],
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_7__["BrowserAnimationsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ReactiveFormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormsModule"],
                _angular_material_radio__WEBPACK_IMPORTED_MODULE_6__["MatRadioModule"],
                _angular_material_button__WEBPACK_IMPORTED_MODULE_8__["MatButtonModule"],
                _angular_material_input__WEBPACK_IMPORTED_MODULE_9__["MatInputModule"],
            ],
            providers: [],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/constants/leica/codes.ts":
/*!******************************************!*\
  !*** ./src/app/constants/leica/codes.ts ***!
  \******************************************/
/*! exports provided: CODES */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CODES", function() { return CODES; });
var CODES = {
    // General information
    '11': 'Pointnumber',
    '12': 'Instrument serial number',
    '13': 'Instrument type',
    '16': 'Station Pointnumber',
    '17': 'Date',
    '19': 'Time',
    // Angles
    '21': 'Hz',
    '22': 'Vr',
    // distances
    '31': 'Sloping distance',
    '32': 'Horizontal distance',
    '33': 'Height difference',
    // Addicent information for distance
    '51': 'Constants',
    '52': 'number of measurements, standard deviation',
    '53': 'Average square error',
    '58': 'Prism constant',
    '59': 'PPM',
    // coordinates
    '81': 'X - Target Easting',
    '82': 'Y - Target Northing',
    '83': 'H - Target Elevation',
    '84': 'X - Station Easting',
    '85': 'Y - Station Northing',
    '86': 'H - Station Elevation',
    '87': 'Reflector height',
    '88': 'Instrument height',
};


/***/ }),

/***/ "./src/app/constants/leica/input-mode.ts":
/*!***********************************************!*\
  !*** ./src/app/constants/leica/input-mode.ts ***!
  \***********************************************/
/*! exports provided: INPUT_MODE */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "INPUT_MODE", function() { return INPUT_MODE; });
var INPUT_MODE = {
    '0': 'Original measured values transferred from the instrument',
    '1': 'Manual input from keyboard',
    '2': 'Measured value, Hz-Correction ON',
    '3': 'Measured value, Hz-Correction OFF',
    '4': 'Result of special function',
};


/***/ }),

/***/ "./src/app/constants/leica/units.ts":
/*!******************************************!*\
  !*** ./src/app/constants/leica/units.ts ***!
  \******************************************/
/*! exports provided: UNITS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UNITS", function() { return UNITS; });
var UNITS = {
    '0': 'Meter (last digit: 1mm)',
    '1': 'Feet (last digit: 1/1000ft)',
    '2': '400 gon',
    '3': '360° decimal',
    '4': '360° sexagesimal',
    '5': '6400 mil',
    '6': 'Meter (last digit: 1/10mm)',
    '7': 'Feet (last digit: 1/10‘000ft)',
    '8': 'Meter (last digit: 1/100mm)',
};


/***/ }),

/***/ "./src/app/services/leica/leica-gsi.service.ts":
/*!*****************************************************!*\
  !*** ./src/app/services/leica/leica-gsi.service.ts ***!
  \*****************************************************/
/*! exports provided: LeicaGsiService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LeicaGsiService", function() { return LeicaGsiService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _constants_leica_codes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../constants/leica/codes */ "./src/app/constants/leica/codes.ts");
/* harmony import */ var _constants_leica_units__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../constants/leica/units */ "./src/app/constants/leica/units.ts");
/* harmony import */ var _constants_leica_input_mode__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../constants//leica/input-mode */ "./src/app/constants/leica/input-mode.ts");





var LeicaGsiService = /** @class */ (function () {
    function LeicaGsiService() {
    }
    LeicaGsiService.prototype.splitOnPoints = function (stringToParse) {
        var pointsArray = [];
        var splittedOnRows = stringToParse.split('\n');
        splittedOnRows.forEach(function (row, index) {
            pointsArray[index] = row.split(' ');
        });
        return pointsArray;
    };
    LeicaGsiService.prototype.parsePoints = function (pointsArr) {
        var _this = this;
        var points = [];
        pointsArr.forEach(function (point) {
            var newPoint = {};
            point.forEach(function (word) {
                var format_length = 8;
                word.length === 23 ? format_length = 16 : null;
                newPoint['Format_name'] = 'GSI' + format_length;
                var wordCode = word.slice(0, 2);
                switch (wordCode) {
                    case '11':
                        newPoint[_constants_leica_codes__WEBPACK_IMPORTED_MODULE_2__["CODES"][wordCode]] = _this.trimZeros(word.slice(-format_length));
                        newPoint['lineNumber'] = word.slice(2, 6);
                        break;
                    case '12':
                        newPoint[_constants_leica_codes__WEBPACK_IMPORTED_MODULE_2__["CODES"][wordCode]] = word.slice(-format_length);
                        break;
                    case '13':
                        newPoint[_constants_leica_codes__WEBPACK_IMPORTED_MODULE_2__["CODES"][wordCode]] = word.slice(-format_length);
                        break;
                    case '16':
                        newPoint[_constants_leica_codes__WEBPACK_IMPORTED_MODULE_2__["CODES"][wordCode]] = _this.trimZeros(word.slice(-format_length));
                        break;
                    case '17':
                        newPoint[_constants_leica_codes__WEBPACK_IMPORTED_MODULE_2__["CODES"][wordCode]] = _this.getDate(word, format_length);
                        break;
                    case '19':
                        newPoint[_constants_leica_codes__WEBPACK_IMPORTED_MODULE_2__["CODES"][wordCode]] = _this.getTime(word, format_length);
                        break;
                    case '21':
                        // Automatic_index_information
                        newPoint['Automatic_index_information_HZ'] = _this.getAutomaticIndex(word);
                        // input mode
                        newPoint[_constants_leica_codes__WEBPACK_IMPORTED_MODULE_2__["CODES"][wordCode] + '_input_mode'] = _this.getInputMode(word);
                        // Units
                        newPoint[_constants_leica_codes__WEBPACK_IMPORTED_MODULE_2__["CODES"][wordCode] + '_unit'] = _this.getUnitName(word);
                        // value information
                        newPoint[_constants_leica_codes__WEBPACK_IMPORTED_MODULE_2__["CODES"][wordCode]] = _this.getAngle(word, format_length);
                        break;
                    case '22':
                        // Automatic_index_information
                        newPoint['Automatic_index_information_HZ'] = _this.getAutomaticIndex(word);
                        // Units
                        newPoint[_constants_leica_codes__WEBPACK_IMPORTED_MODULE_2__["CODES"][wordCode] + '_unit'] = _this.getUnitName(word);
                        // input mode
                        newPoint[_constants_leica_codes__WEBPACK_IMPORTED_MODULE_2__["CODES"][wordCode] + '_input_mode'] = _this.getInputMode(word);
                        // value information
                        newPoint[_constants_leica_codes__WEBPACK_IMPORTED_MODULE_2__["CODES"][wordCode]] = _this.getAngle(word, format_length);
                        break;
                    case '31':
                        // Units
                        newPoint[_constants_leica_codes__WEBPACK_IMPORTED_MODULE_2__["CODES"][wordCode] + '_unit'] = _this.getUnitName(word);
                        // input mode
                        newPoint[_constants_leica_codes__WEBPACK_IMPORTED_MODULE_2__["CODES"][wordCode] + '_input_mode'] = _this.getInputMode(word);
                        // parse Sloping distance to meter or feets
                        newPoint[_constants_leica_codes__WEBPACK_IMPORTED_MODULE_2__["CODES"][wordCode]] = _this.getDistanceInMt_Ft(word, format_length);
                        break;
                    case '32':
                        // Units
                        newPoint[_constants_leica_codes__WEBPACK_IMPORTED_MODULE_2__["CODES"][wordCode] + '_unit'] = _this.getUnitName(word);
                        // input mode
                        newPoint[_constants_leica_codes__WEBPACK_IMPORTED_MODULE_2__["CODES"][wordCode] + '_input_mode'] = _this.getInputMode(word);
                        // parse Sloping distance to meter or feets
                        newPoint[_constants_leica_codes__WEBPACK_IMPORTED_MODULE_2__["CODES"][wordCode]] = _this.getDistanceInMt_Ft(word, format_length);
                        break;
                    case '33':
                        // Units
                        newPoint[_constants_leica_codes__WEBPACK_IMPORTED_MODULE_2__["CODES"][wordCode] + '_unit'] = _this.getUnitName(word);
                        // input mode
                        newPoint[_constants_leica_codes__WEBPACK_IMPORTED_MODULE_2__["CODES"][wordCode] + '_input_mode'] = _this.getInputMode(word);
                        // parse Sloping distance to meter or feets
                        newPoint[_constants_leica_codes__WEBPACK_IMPORTED_MODULE_2__["CODES"][wordCode]] = _this.getDistanceInMt_Ft(word, format_length);
                        break;
                    case '51':
                        var ppmArr = word.trim().split('').splice(6, 5);
                        var prismConstArr = word.split('').splice(12, 5);
                        var ppm = +ppmArr.join('');
                        var prismConst = +prismConstArr.join('');
                        // parse PPM value and prismConst to milimeter
                        // console.log(ppm, prismConst )
                        newPoint[_constants_leica_codes__WEBPACK_IMPORTED_MODULE_2__["CODES"]['58']] = prismConst;
                        newPoint[_constants_leica_codes__WEBPACK_IMPORTED_MODULE_2__["CODES"]['59']] = ppm;
                        break;
                    case '58':
                        // Units
                        newPoint[_constants_leica_codes__WEBPACK_IMPORTED_MODULE_2__["CODES"][wordCode] + '_unit'] = _this.getUnitName(word);
                        // input mode
                        newPoint[_constants_leica_codes__WEBPACK_IMPORTED_MODULE_2__["CODES"][wordCode] + '_input_mode'] = _this.getInputMode(word);
                        // value
                        newPoint[_constants_leica_codes__WEBPACK_IMPORTED_MODULE_2__["CODES"][wordCode]] = _this.getDistanceInMt_Ft(word, format_length);
                        break;
                    case '59':
                        // Units
                        newPoint[_constants_leica_codes__WEBPACK_IMPORTED_MODULE_2__["CODES"][wordCode] + '_unit'] = _this.getUnitName(word);
                        // input mode
                        newPoint[_constants_leica_codes__WEBPACK_IMPORTED_MODULE_2__["CODES"][wordCode] + '_input_mode'] = _this.getInputMode(word);
                        // value
                        newPoint[_constants_leica_codes__WEBPACK_IMPORTED_MODULE_2__["CODES"][wordCode]] = +word.slice(-9) / 10000;
                        break;
                    case '81':
                        // Units
                        newPoint[_constants_leica_codes__WEBPACK_IMPORTED_MODULE_2__["CODES"][wordCode] + '_unit'] = _this.getUnitName(word);
                        // input mode
                        newPoint[_constants_leica_codes__WEBPACK_IMPORTED_MODULE_2__["CODES"][wordCode] + '_input_mode'] = _this.getInputMode(word);
                        // parse Sloping distance to meter or feets
                        newPoint[_constants_leica_codes__WEBPACK_IMPORTED_MODULE_2__["CODES"][wordCode]] = _this.getDistanceInMt_Ft(word, format_length);
                        break;
                    case '82':
                        // Units
                        newPoint[_constants_leica_codes__WEBPACK_IMPORTED_MODULE_2__["CODES"][wordCode] + '_unit'] = _this.getUnitName(word);
                        // input mode
                        newPoint[_constants_leica_codes__WEBPACK_IMPORTED_MODULE_2__["CODES"][wordCode] + '_input_mode'] = _this.getInputMode(word);
                        // parse Sloping distance to meter or feets
                        newPoint[_constants_leica_codes__WEBPACK_IMPORTED_MODULE_2__["CODES"][wordCode]] = _this.getDistanceInMt_Ft(word, format_length);
                        break;
                    case '83':
                        // Units
                        newPoint[_constants_leica_codes__WEBPACK_IMPORTED_MODULE_2__["CODES"][wordCode] + '_unit'] = _this.getUnitName(word);
                        // input mode
                        newPoint[_constants_leica_codes__WEBPACK_IMPORTED_MODULE_2__["CODES"][wordCode] + '_input_mode'] = _this.getInputMode(word);
                        // parse Sloping distance to meter or feets
                        newPoint[_constants_leica_codes__WEBPACK_IMPORTED_MODULE_2__["CODES"][wordCode]] = _this.getDistanceInMt_Ft(word, format_length);
                        break;
                    case '84':
                        // Units
                        newPoint[_constants_leica_codes__WEBPACK_IMPORTED_MODULE_2__["CODES"][wordCode] + '_unit'] = _this.getUnitName(word);
                        // input mode
                        newPoint[_constants_leica_codes__WEBPACK_IMPORTED_MODULE_2__["CODES"][wordCode] + '_input_mode'] = _this.getInputMode(word);
                        // parse Sloping distance to meter or feets
                        newPoint[_constants_leica_codes__WEBPACK_IMPORTED_MODULE_2__["CODES"][wordCode]] = _this.getDistanceInMt_Ft(word, format_length);
                        break;
                    case '85':
                        // Units
                        newPoint[_constants_leica_codes__WEBPACK_IMPORTED_MODULE_2__["CODES"][wordCode] + '_unit'] = _this.getUnitName(word);
                        // input mode
                        newPoint[_constants_leica_codes__WEBPACK_IMPORTED_MODULE_2__["CODES"][wordCode] + '_input_mode'] = _this.getInputMode(word);
                        // parse Sloping distance to meter or feets
                        newPoint[_constants_leica_codes__WEBPACK_IMPORTED_MODULE_2__["CODES"][wordCode]] = _this.getDistanceInMt_Ft(word, format_length);
                        break;
                    case '86':
                        // Units
                        newPoint[_constants_leica_codes__WEBPACK_IMPORTED_MODULE_2__["CODES"][wordCode] + '_unit'] = _this.getUnitName(word);
                        // input mode
                        newPoint[_constants_leica_codes__WEBPACK_IMPORTED_MODULE_2__["CODES"][wordCode] + '_input_mode'] = _this.getInputMode(word);
                        // parse Sloping distance to meter or feets
                        newPoint[_constants_leica_codes__WEBPACK_IMPORTED_MODULE_2__["CODES"][wordCode]] = _this.getDistanceInMt_Ft(word, format_length);
                        break;
                    case '87':
                        // Units
                        newPoint[_constants_leica_codes__WEBPACK_IMPORTED_MODULE_2__["CODES"][wordCode] + '_unit'] = _this.getUnitName(word);
                        // input mode
                        newPoint[_constants_leica_codes__WEBPACK_IMPORTED_MODULE_2__["CODES"][wordCode] + '_input_mode'] = _this.getInputMode(word);
                        // parse Sloping distance to meter or feets
                        newPoint[_constants_leica_codes__WEBPACK_IMPORTED_MODULE_2__["CODES"][wordCode]] = _this.getDistanceInMt_Ft(word, format_length);
                        break;
                    case '88':
                        // Units
                        newPoint[_constants_leica_codes__WEBPACK_IMPORTED_MODULE_2__["CODES"][wordCode] + '_unit'] = _this.getUnitName(word);
                        // input mode
                        newPoint[_constants_leica_codes__WEBPACK_IMPORTED_MODULE_2__["CODES"][wordCode] + '_input_mode'] = _this.getInputMode(word);
                        // parse Sloping distance to meter or feets
                        newPoint[_constants_leica_codes__WEBPACK_IMPORTED_MODULE_2__["CODES"][wordCode]] = _this.getDistanceInMt_Ft(word, format_length);
                        break;
                }
            });
            points.push(newPoint);
        });
        return points;
    };
    LeicaGsiService.prototype.getParsedData = function (stringToParse) {
        var pointArr = this.splitOnPoints(stringToParse);
        return this.parsePoints(pointArr);
    };
    // GSI8
    LeicaGsiService.prototype.getAngle = function (survey, format_length) {
        var unit = this.getUnitCode(survey);
        var divisor = 100000;
        if (unit === '5') {
            divisor = 10000;
            return this.getDecimalAngle(survey, divisor, format_length);
        }
        else if (unit === '4') {
            return this.getSexagesimalAngle(survey, format_length);
        }
        else {
            return this.getDecimalAngle(survey, divisor, format_length);
        }
    };
    // GSI8
    LeicaGsiService.prototype.getDecimalAngle = function (survey, divisor, format_length) {
        var angleArr = survey.split('').slice(-format_length - 1);
        var angle = +(angleArr[0] + '1') * (+angleArr.slice(-8).join('') / divisor);
        return angle;
    };
    // GSI8
    LeicaGsiService.prototype.getSexagesimalAngle = function (survey, format_length) {
        var angleArr = survey.split('').slice(-format_length - 1);
        var degrees = +angleArr.slice(-8, -5).join('');
        var minutes = +angleArr.slice(-5, -3).join('');
        var seconds = +angleArr.slice(-3).join('') / 10;
        return +(angleArr[0] + '1') * (degrees + minutes / 60 + seconds / 3600);
    };
    LeicaGsiService.prototype.getAutomaticIndex = function (word) {
        var automaticIndexHZ = word.trim().split('').splice(3, 1)[0];
        if (automaticIndexHZ === "0") {
            return 'OFF';
        }
        if (automaticIndexHZ === "1" || automaticIndexHZ === "3") {
            return 'OPERATING';
        }
    };
    LeicaGsiService.prototype.getUnitCode = function (survey) {
        return survey.split('').splice(5, 1)[0];
    };
    LeicaGsiService.prototype.getInputMode = function (word) {
        var inputModeCode = word.trim().split('').splice(4, 1)[0];
        var mode = _constants_leica_input_mode__WEBPACK_IMPORTED_MODULE_4__["INPUT_MODE"][inputModeCode];
        return mode;
    };
    // GSI8, GSI16
    LeicaGsiService.prototype.getDistanceInMt_Ft = function (word, format_length) {
        var unit = this.getUnitCode(word);
        var numbersArray = word.trim().split('').slice(-format_length - 1);
        var divisor = 1000;
        if (unit === "6" || unit === "7") {
            divisor = 10000;
        }
        else if (unit === "8") {
            divisor = 100000;
        }
        var value = +(numbersArray[0] + '1') * (+ +numbersArray.slice(-format_length).join('') / divisor);
        console.log(numbersArray);
        return value;
    };
    LeicaGsiService.prototype.getUnitName = function (word) {
        var unit = this.getUnitCode(word);
        var unitName = _constants_leica_units__WEBPACK_IMPORTED_MODULE_3__["UNITS"][unit];
        return unitName;
    };
    // GSI8
    LeicaGsiService.prototype.getDate = function (word, length_format) {
        var dateString = word.slice(-length_format);
        var day = dateString.slice(-8, -6);
        var mounth = dateString.slice(-6, -4);
        var year = dateString.slice(-4);
        return day + '.' + mounth + '.' + year;
    };
    // GSI8
    LeicaGsiService.prototype.getTime = function (word, length_format) {
        var dateString = word.slice(-length_format);
        var day = dateString.slice(-8, -6);
        var mounth = dateString.slice(-6, -4);
        var hours = dateString.slice(-4, -2);
        var minutes = dateString.slice(-2);
        return day + '.' + mounth + ' ' + hours + ":" + minutes;
    };
    LeicaGsiService.prototype.trimZeros = function (value) {
        return value.replace(/^0+/, '');
    };
    LeicaGsiService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], LeicaGsiService);
    return LeicaGsiService;
}());



/***/ }),

/***/ "./src/app/services/topcon/topcon.service.ts":
/*!***************************************************!*\
  !*** ./src/app/services/topcon/topcon.service.ts ***!
  \***************************************************/
/*! exports provided: TopconService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TopconService", function() { return TopconService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var TopconService = /** @class */ (function () {
    function TopconService() {
    }
    TopconService.prototype.splitOnPoints = function (stringToParse) {
        var rowsArray = [];
        var splittedOnRows = stringToParse.split('\n');
        splittedOnRows.forEach(function (row, index) {
            if (row !== "") {
                rowsArray[index] = row.split(/ +/);
            }
        });
        console.log(rowsArray);
        return rowsArray;
    };
    TopconService.prototype.parsePoints = function (pointsArr) {
        var points = [];
        var newStation = {};
        var newPoint = { isEmpty: true };
        var UNITS = {};
        var xyzForStation = true;
        pointsArr.forEach(function (row) {
            switch (row[0]) {
                case 'UNITS':
                    var _a = row[1].split(','), linear = _a[0], anglar = _a[1];
                    UNITS['linear'] = linear;
                    UNITS['anglar'] = anglar;
                    break;
                case 'STN':
                    newStation = new Object();
                    xyzForStation = true;
                    var _b = row[1].split(','), name_1 = _b[0], height = _b[1];
                    newStation['stationName'] = name_1;
                    newStation['stationHeight'] = height;
                    break;
                case "BKB":
                    var _c = row[1].split(','), BKB_Name = _c[0], BKB_Azimuth = _c[1], BKB_hz_angle = _c[2];
                    newStation['BKB_Name'] = BKB_Name;
                    newStation['BKB_Azimuth'] = BKB_Azimuth;
                    newStation['BKB_hz_angle'] = BKB_hz_angle;
                    break;
                case "BS":
                    var _d = row[1].split(','), BS_Name = _d[0], BS_height = _d[1];
                    newStation['BS_Name'] = BS_Name;
                    newStation['BS_height'] = BS_height;
                    break;
                case 'SS':
                    if (!newPoint.isEmpty) {
                        points.push(newPoint);
                    }
                    newPoint = new Object();
                    xyzForStation = false;
                    var _e = row[1].split(','), name1 = _e[0], targetHeight = _e[1], pointCode = _e[2];
                    newPoint['isEmpty'] = false;
                    newPoint['pointName'] = name1;
                    newPoint['pointTargetHeight'] = targetHeight;
                    newPoint['pointCode'] = pointCode;
                    newPoint['stationName'] = newStation['stationName'];
                    newPoint['stationHeight'] = newStation['stationHeight'];
                    newPoint['linearUnit'] = UNITS['linear'];
                    newPoint['angularUnit'] = UNITS['anglar'];
                    if (newStation['X - Station Easting']) {
                        newPoint['X - Station Easting'] = newStation['X - Station Easting'];
                        newPoint['Y - Station Northing'] = newStation['Y - Station Northing'];
                        newPoint['H - Station Elevation'] = newStation['H - Station Elevation'];
                    }
                    break;
                case 'HV':
                    var _f = row[1].split(','), hzAngle = _f[0], vrAngle = _f[1];
                    newPoint['HZ'] = hzAngle;
                    newPoint['VR'] = vrAngle;
                    // points.push(newPoint); 
                    break;
                case 'SD':
                    var _g = row[1].split(','), hzAngle1 = _g[0], vrAngle1 = _g[1], slopeDistance = _g[2];
                    newPoint['HZ'] = hzAngle1;
                    newPoint['VR'] = vrAngle1;
                    newPoint['Sloping distance'] = slopeDistance;
                    // points.push(newPoint);
                    break;
                case 'HD':
                    var _h = row[1].split(','), hzAngle2 = _h[0], s = _h[1], dH = _h[2];
                    newPoint['HZ'] = hzAngle2;
                    newPoint['Horizontal excess'] = s;
                    newPoint['Height difference'] = dH;
                    // points.push(newPoint);
                    break;
                case 'XYZ':
                    var _j = row[1].split(','), x = _j[0], y = _j[1], z = _j[2];
                    if (xyzForStation) {
                        // xyzForStation = false;
                        newStation['X - Station Easting'] = x;
                        newStation['Y - Station Northing'] = y;
                        newStation['H - Station Elevation'] = z;
                    }
                    else {
                        newPoint['X - Target Easting'] = x;
                        newPoint['Y - Target Northing'] = y;
                        newPoint['H - Target Elevation'] = z;
                    }
                    break;
            }
        });
        points.push(newPoint);
        return points;
    };
    TopconService.prototype.getParsedData = function (stringToParse) {
        var pointArr = this.splitOnPoints(stringToParse);
        return this.parsePoints(pointArr);
    };
    TopconService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], TopconService);
    return TopconService;
}());



/***/ }),

/***/ "./src/app/shared/table-constructors/leica.ts":
/*!****************************************************!*\
  !*** ./src/app/shared/table-constructors/leica.ts ***!
  \****************************************************/
/*! exports provided: dataToExel_Leica */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dataToExel_Leica", function() { return dataToExel_Leica; });
var dataToExel_Leica = function (pointsArray) {
    var data = [[
            "Point Number",
            "Horizontal Angle",
            "Vertical Angle",
            "Sloping distance",
            "Horizontal distance",
            "Height difference",
            "X - Target Easting",
            "Y - Target Northing",
            "H - Target Elevation",
            "X - Station Easting",
            "Y - Station Northing",
            "H - Station Elevation",
            "Reflector height",
            "Instrument height",
        ]];
    pointsArray.forEach(function (point) {
        var exelArray = [
            point.Pointnumber,
            point.Hz,
            point.Vr,
            point["Sloping distance"] || '-',
            point["Horizontal distance"] || '-',
            point["Height difference"] || '-',
            point["X - Target Easting"] || '-',
            point["Y - Target Northing"] || '-',
            point["H - Target Elevation"] || '-',
            point["X - Station Easting"] || '-',
            point["Y - Station Northing"] || '-',
            point["H - Station Elevation"] || '-',
            point["Reflector height"] || '-',
            point["Instrument height"] || '-',
        ];
        data.push(exelArray);
    });
    return data;
};


/***/ }),

/***/ "./src/app/shared/table-constructors/topcon.ts":
/*!*****************************************************!*\
  !*** ./src/app/shared/table-constructors/topcon.ts ***!
  \*****************************************************/
/*! exports provided: dataToExel_Topcon */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dataToExel_Topcon", function() { return dataToExel_Topcon; });
var dataToExel_Topcon = function (pointsArray) {
    var data = [[
            "Point Number",
            "Station Name",
            "Station Height",
            "Horizontal Angle",
            "Vertical Angle",
            "Sloping distance",
            "Horizontal excess",
            "Height difference",
            "X - Target Easting",
            "Y - Target Northing",
            "H - Target Elevation",
            "X - Station Easting",
            "Y - Station Northing",
            "H - Station Elevation",
        ]];
    pointsArray.forEach(function (point) {
        var exelArray = [
            point.pointName,
            point["stationName"],
            point["stationHeight"],
            point.HZ || '-',
            point.VR || '-',
            point["Sloping distance"] || '-',
            point["Horizontal excess"] || '-',
            point["Height difference"] || '-',
            point["X - Target Easting"] || '-',
            point["Y - Target Northing"] || '-',
            point["H - Target Elevation"] || '-',
            point["X - Station Easting"] || '-',
            point["Y - Station Northing"] || '-',
            point["H - Station Elevation"] || '-',
        ];
        data.push(exelArray);
    });
    return data;
};


/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.error(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\@A - files\Study\Final project\front\FormatStandardify\format-standardify\src\main.ts */"./src/main.ts");


/***/ }),

/***/ 1:
/*!********************!*\
  !*** fs (ignored) ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 2:
/*!************************!*\
  !*** crypto (ignored) ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 3:
/*!************************!*\
  !*** stream (ignored) ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map