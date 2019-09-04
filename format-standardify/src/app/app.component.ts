import { Component, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import * as XLSX from 'xlsx';
import { LeicaGsiService } from './services/leica/leica-gsi.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  public points;
  public data;

  formGroup = this.fb.group({
    file: [null, Validators.required]
  });

  constructor( 
    private fb: FormBuilder, 
    private cd: ChangeDetectorRef, 
    private leicaGsiService: LeicaGsiService ) {}
  
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
    this.points = this.leicaGsiService.getParsedData(this.formGroup.value.file);
    // console.log(resultArray);
    this.points.forEach((row)=> console.log(row))

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
public insertDataToExel(pointsArray){
  this.data = [["Point Number", "HZ", "VR", "S", "X", "Y", "H"]];
  pointsArray.forEach((point) => {
    let exelArray = [
      point.Pointnumber,
      point.Hz,
      point.Vr,
      point["Sloping distance"],
      point.X,
      point.Y,
      point.H
    ];
    this.data.push(exelArray)
  })

  return this.data
}

public creeteXLSX(){
  /* generate worksheet */
  let ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(this.insertDataToExel(this.points));

  /* generate workbook and add the worksheet */
  let wb: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

  /* save to file */
  XLSX.writeFile(wb, 'SheetJS.xlsx');
  }
}
