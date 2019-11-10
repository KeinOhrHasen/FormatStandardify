import { Component, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import * as XLSX from 'xlsx';
import { LeicaGsiService } from './services/leica/leica-gsi.service';
import { TopconService } from './services/topcon/topcon.service';
import { dataToExel_Leica } from './shared/table-constructors/leica'
import { dataToExel_Topcon } from './shared/table-constructors/topcon'
import { dataToExel_Carlson } from './shared/table-constructors/carlson'
import { CarlsonService } from './services/carlson/carlson.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  public points;
  public choosenFormat: string;
  public  all_formats: string[] = ['.gsi', '.rts-6',  '.rw-5'];

  formGroup = this.fb.group({
    file: [null, Validators.required]
  });

  constructor( 
    private fb: FormBuilder, 
    private cd: ChangeDetectorRef, 
    private leicaGsiService: LeicaGsiService,
    private topconService: TopconService,
    private carlsonService: CarlsonService,
    ) {}
  
  onFileChange(event) {
    const reader = new FileReader();
 
    if(event.target.files && event.target.files.length) {
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

  public onSubmit(){
    // console.log(this.formGroup.value);
    if (this.choosenFormat === '.gsi'){
      this.points = this.leicaGsiService.getParsedData(this.formGroup.value.file);
    }
    else if (this.choosenFormat === '.rts-6'){
      this.points = this.topconService.getParsedData(this.formGroup.value.file);
    }
    else if (this.choosenFormat === '.rw-5'){
      this.points = this.carlsonService.getParsedData(this.formGroup.value.file);
    }
    // this.points.forEach((row)=> console.log(row))
    console.log(this.points);

  }

  public saveFile(){
    let text = this.formGroup.value.file;
    let textToSaveAsBlob = new Blob([text], {type:"text/plain"});
    let textToSaveAsURL  = window.URL.createObjectURL(textToSaveAsBlob);
    let fileNameToSaveAs = 'result';

    let downloadLink = document.createElement("a");
    downloadLink.download = fileNameToSaveAs;
    downloadLink.innerHTML = "Download File";
    downloadLink.href = textToSaveAsURL;
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
 
    downloadLink.click();
  }

// xlsx part ------------------------------------------------
public dataToExel(pointsArray){
  if (this.choosenFormat === '.gsi'){
    return dataToExel_Leica(pointsArray);
  }else if (this.choosenFormat === '.rts-6'){
    return dataToExel_Topcon(pointsArray);
  }else if (this.choosenFormat === '.rw-5'){
    return dataToExel_Carlson(pointsArray);
  }
}


public creeteXLSX(){
  /* generate worksheet */
  let ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(this.dataToExel(this.points));

  /* generate workbook and add the worksheet */
  let wb: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

  /* save to file */
  XLSX.writeFile(wb, 'SheetJS.xlsx');
  }
}
