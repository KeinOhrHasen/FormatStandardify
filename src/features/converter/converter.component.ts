import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ALL_FORMATS } from '../../shared/constants/all_formats';
import { LeicaGsiService } from '../../shared/services/leica/leica-gsi.service';
import { TopconService } from '../../shared/services/topcon/topcon.service';
import { CarlsonService } from '../../shared/services/carlson/carlson.service';
import { dataToExel_Leica } from '../../shared/utils/table-constructors/leica';
import { dataToExel_Topcon } from '../../shared/utils/table-constructors/topcon';
import { dataToExel_Carlson } from '../../shared/utils/table-constructors/carlson';
import { dataToExel_CubeA } from '../../shared/utils/table-constructors/cube-a';
import { creeteXLSXfile } from '../../shared/utils/common-functions/stonex/file-manager';
import { CommonModule } from '@angular/common';
import { ConverterRoutingModule } from './converter-routing.module';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';

import { MatInputModule } from '@angular/material/input';

import { MatFormFieldModule } from '@angular/material/form-field';

import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ConverterRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatRadioModule,
    MatButtonModule,

    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatTooltipModule,
  ],
})
export class ConverterComponent implements OnInit {
  public points: any;
  //   public choosenFormat: string;
  public fileName = '';
  public all_formats: string[] = ALL_FORMATS;
  public readyToSaveExcel = false;
  public currentYear = new Date().getFullYear();
  public idDashboard = false;

  public formatForm: FormGroup = new FormGroup({
    file: new FormControl(null, [Validators.required]),
    format: new FormControl(null),
  });

  constructor(
    private cd: ChangeDetectorRef,
    private leicaGsiService: LeicaGsiService,
    private topconService: TopconService,
    private carlsonService: CarlsonService,
    public router: Router,
  ) {}

  get formatValue(): string {
    return (this.formatForm.get('format') as any).value;
  }

  ngOnInit(): void {
    this.idDashboard = this.router.url.endsWith('converter');
  }

  onFileChange(event: any): void {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsText(file);

      this.fileName = file.name;

      reader.onload = () => {
        this.formatForm.patchValue({
          file: reader.result,
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
      format: null,
    });
  }

  public onSubmit(): void {
    if (this.formatValue === '.gsi') {
      this.points = this.leicaGsiService.getParsedData(this.formatForm.value.file);
    } else if (this.formatValue === '.rts-6') {
      this.points = this.topconService.getParsedData(this.formatForm.value.file);
    } else if (this.formatValue === '.rw-5') {
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
    if (this.formatValue === '.gsi') {
      return dataToExel_Leica(pointsArray);
    } else if (this.formatValue === '.rts-6') {
      return dataToExel_Topcon(pointsArray);
    } else if (this.formatValue === '.rw-5') {
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
