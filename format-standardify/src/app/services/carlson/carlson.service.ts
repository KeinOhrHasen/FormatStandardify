import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarlsonService {

  constructor() { }

  public getParsedData(stringToParse: string){
    console.log(stringToParse);
    
  }
}
