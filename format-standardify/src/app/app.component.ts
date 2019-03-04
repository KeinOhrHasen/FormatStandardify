import { Component, ChangeDetectorRef, OnInit, OnChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnChanges {

  formGroup = this.fb.group({
    file: [null, Validators.required]
  });

  constructor( private fb: FormBuilder, private cd: ChangeDetectorRef ) {}
  
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

  onSubmit(){
    console.log(this.formGroup.value)
  }

  saveFile(){
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
data = [[1, 2], ["A", "B"]];

creeteXLSX(){
/* generate worksheet */
let ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(this.data);

/* generate workbook and add the worksheet */
let wb: XLSX.WorkBook = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

/* save to file */
XLSX.writeFile(wb, 'SheetJS.xlsx');
}

//--------------------------------------------

name = "Ivan"


ngOnInit(){
}

ngOnChanges(){
}

showName(){
  console.log(this.name)

}

}
