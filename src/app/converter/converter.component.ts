import { Component, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ALL_FORMATS } from '../shared/constants/all_formats';
import { LeicaGsiService } from '../services/leica/leica-gsi.service';
import { TopconService } from '../services/topcon/topcon.service';
import { CarlsonService } from '../services/carlson/carlson.service';
import { dataToExel_Carlson } from '../shared/table-constructors/carlson';
import { dataToExel_Topcon } from '../shared/table-constructors/topcon';
import { dataToExel_Leica } from '../shared/table-constructors/leica';
import { dataToExel_CubeA } from '../shared/table-constructors/cube-a';
import { creeteXLSXfile } from '../shared/common-functions/stonex/file-manager';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.css']
})
export class ConverterComponent {

  public points: any;
  public choosenFormat: string;
  public fileName = '';
  public all_formats: string[] = ALL_FORMATS;
  public readyToSaveExcel = false;
  public currentYear = new Date().getFullYear();

  public formatForm: FormGroup = this.fb.group({
      file: [null, Validators.required],
      format: null
  });

  public idDashboard: boolean = this.router.url.endsWith('converter');

  constructor(
      private fb: FormBuilder,
      private cd: ChangeDetectorRef,
      private leicaGsiService: LeicaGsiService,
      private topconService: TopconService,
      private carlsonService: CarlsonService,
      public authService: AuthService,
      public router: Router,
  ) {}

  onFileChange(event: any): void {
      const reader = new FileReader();

      if (event.target.files && event.target.files.length) {
          const [file] = event.target.files;
          reader.readAsText(file);

          this.fileName = file.name;

          reader.onload = () => {
          this.formatForm.patchValue({
              file: reader.result
          });

          // need to run CD since file load runs outside of zone
          this.cd.markForCheck();
          };
      }

      this.readyToSaveExcel = false;
      this.deselectFormatType();
  }

  private deselectFormatType(): void {
      this.formatForm.patchValue({
          format: null
      });
  }

  public onSubmit(): void {
      if (this.formatForm.get('format').value === '.gsi') {
          this.points = this.leicaGsiService.getParsedData(this.formatForm.value.file);
      } else if (this.formatForm.get('format').value === '.rts-6') {
          this.points = this.topconService.getParsedData(this.formatForm.value.file);
      } else if (this.formatForm.get('format').value === '.rw-5') {
          this.points = this.carlsonService.getParsedData(this.formatForm.value.file);
      }

    this.readyToSaveExcel = this.checkOnVadlidFormat(this.points);
  }

  public checkOnVadlidFormat(pointsArray: any): boolean {
    // if points array invalid - it has only 1 row - table headers
    if (pointsArray.length < 2) {
        alert('Choose valid format from dropdown menu or upload a correct file');
        return false;
    }
    return true;
  }

  public dataToExel(pointsArray: any): any {
      if (this.formatForm.get('format').value === '.gsi') {
          return dataToExel_Leica(pointsArray);
      } else if (this.formatForm.get('format').value === '.rts-6') {
          return dataToExel_Topcon(pointsArray);
      } else if (this.formatForm.get('format').value === '.rw-5') {
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
}
