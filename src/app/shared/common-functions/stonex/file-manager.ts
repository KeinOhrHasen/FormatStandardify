import * as XLSX from 'xlsx';

export const saveToTxtFile = function(file: string): void {
    const text = file;
    const textToSaveAsBlob = new Blob([text], {type: 'text/plain'});
    const textToSaveAsURL  = window.URL.createObjectURL(textToSaveAsBlob);
    const fileNameToSaveAs = 'result';

    const downloadLink = document.createElement('a');
    downloadLink.download = fileNameToSaveAs;
    downloadLink.innerHTML = 'Download File';
    downloadLink.href = textToSaveAsURL;
    downloadLink.style.display = 'none';
    document.body.appendChild(downloadLink);

    downloadLink.click();
};

export const creeteXLSXfile = function(points: any): void {
    /* generate worksheet */
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(points);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, 'SheetJS.xlsx');
};
