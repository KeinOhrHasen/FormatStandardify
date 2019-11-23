import { Component, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { LeicaGsiService } from './services/leica/leica-gsi.service';
import { TopconService } from './services/topcon/topcon.service';
import { dataToExel_Leica } from './shared/table-constructors/leica';
import { dataToExel_Topcon } from './shared/table-constructors/topcon';
import { dataToExel_Carlson } from './shared/table-constructors/carlson';
import { CarlsonService } from './services/carlson/carlson.service';
import { dataToExel_CubeA } from './shared/table-constructors/cube-a';
import { saveToTxtFile, creeteXLSXfile } from './shared/common-functions/stonex/file-manager';
import { ALL_FORMATS } from './shared/constants/all_formats';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent  {
    public points: any;
    public choosenFormat: string;
    public all_formats: string[] = ALL_FORMATS;
    public readyToSaveExcel = false;

    public formGroup: FormGroup = this.fb.group({
        file: [null, Validators.required]
    });

    constructor(
        private fb: FormBuilder,
        private cd: ChangeDetectorRef,
        private leicaGsiService: LeicaGsiService,
        private topconService: TopconService,
        private carlsonService: CarlsonService,
    ) {}

    onFileChange(event: any): void {
        const reader = new FileReader();

        if (event.target.files && event.target.files.length) {
            const [file] = event.target.files;
            reader.readAsText(file);

            reader.onload = () => {
            this.formGroup.patchValue({
                file: reader.result
            });

            // need to run CD since file load runs outside of zone
            this.cd.markForCheck();
            };
        }
    }

    public onSubmit(): void {
        if (this.choosenFormat === '.gsi') {
            this.points = this.leicaGsiService.getParsedData(this.formGroup.value.file);
        } else if (this.choosenFormat === '.rts-6') {
            this.points = this.topconService.getParsedData(this.formGroup.value.file);
        } else if (this.choosenFormat === '.rw-5') {
            this.points = this.carlsonService.getParsedData(this.formGroup.value.file);
        }

    console.log(this.points);
    this.readyToSaveExcel = true;

    }

    public dataToExel(pointsArray: any): any {
        if (this.choosenFormat === '.gsi') {
            return dataToExel_Leica(pointsArray);
        } else if (this.choosenFormat === '.rts-6') {
            return dataToExel_Topcon(pointsArray);
        } else if (this.choosenFormat === '.rw-5') {
            return this.stonexMiddleware(pointsArray);
        }
    }

    private stonexMiddleware(pointsObject: any): any {
        if (pointsObject.softName === 'SurvCE') {
            return dataToExel_Carlson(pointsObject.pointsArray);
        } else if (pointsObject.softName === 'Cube-A') {
            return dataToExel_CubeA(pointsObject.pointsArray);
        }
    }

    public creeteXLSX(): void {
        creeteXLSXfile(this.dataToExel(this.points));
    }

    public saveFile(): void {
        saveToTxtFile(this.formGroup.value.file);
    }
}
