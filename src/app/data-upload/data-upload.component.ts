import { Component, OnInit } from '@angular/core';
import { CsvProcessService } from '../csv-process.service';

@Component({
  selector: 'app-data-upload',
  templateUrl: './data-upload.component.html',
  styleUrls: ['./data-upload.component.scss']
})
export class DataUploadComponent implements OnInit {
  fileuploaded:boolean=false;
  selectedFiles:any;
  IsWait:boolean=false;

  constructor(public fileProcess:CsvProcessService) { }

  ngOnInit(): void {
  }

  async selectFile(event) {
    this.IsWait = true;
    this.selectedFiles = event.target.files;
    this.fileProcess.setFileData(this.selectedFiles[0]).then(()=>{this.fileuploaded = true;this.IsWait=false;});
    
    
}

}
