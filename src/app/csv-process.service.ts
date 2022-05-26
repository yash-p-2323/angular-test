import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CsvProcessService {
  private dataObj: any = {};
  private columns: any = [];
  constructor() { }

  async setFileData(file) {
    var jsonObj = [];
    return new Promise((resolve ,reject)=>{
    //File reader method
    let reader: FileReader = new FileReader();
    reader.readAsText(file);
    reader.onload = (e) => {
      let csv: any = reader.result;
  
      let allTextLines = [];
      allTextLines = csv.split(/\r\n|\r/);
      let headers = allTextLines[0].split(',');
      this.columns = headers;
    
      let arrl = allTextLines.length;
      for (let i = 1; i < arrl; i++) {
        var obj = {};
        var row = allTextLines[i].split(',');
        for(var j = 0; j < row.length; j++) {
          obj[headers[j].trim()] = row[j].trim();
       }
       jsonObj.push(obj);
      }
      this.dataObj=jsonObj;
      resolve("resolved");
    }

  });
  }

  getDataObj() { return this.dataObj }
  getColumns() { return this.columns }
}

