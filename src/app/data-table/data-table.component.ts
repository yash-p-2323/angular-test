import { Component, OnInit, ViewChild } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { CsvProcessService } from '../csv-process.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatPaginator } from '@angular/material/paginator';
import * as _ from 'lodash';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource: any;
  displayedColumns: any;
  filterText: string = '';
  dataObj: any;
  filterCol: string = '';
  typeOfFilter: string = 'string';
  filterName: string = '';
  constructor(processedData: CsvProcessService, private _liveAnnouncer: LiveAnnouncer) {
    this.displayedColumns = processedData.getColumns();
    this.dataObj = processedData.getDataObj()
    this.dataSource = new MatTableDataSource(this.dataObj);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
  }

  colChange() {
    if (this.filterCol == "firstName" || this.filterCol == "lastName" || this.filterCol == "email") {
      this.typeOfFilter = "string";
    }
    else {
      this.typeOfFilter = 'number';
    }
  }

  applyFilter() {
    if (this.filterName == "contains") {
      let colName = this.filterCol;
      let filteredData = _.filter(this.dataObj, (item) => {
        return item[colName].includes(this.filterText);
      })
      console.log(filteredData)
      this.dataSource = new MatTableDataSource(filteredData);
    }
    else if (this.filterName == "notContains") {
      let colName = this.filterCol;
      let filteredData = _.filter(this.dataObj, (item) => {
        return !item[colName].includes(this.filterText);
      })
      console.log(filteredData)
      this.dataSource = new MatTableDataSource(filteredData);
    }
    else if (this.filterName == "equals") {
      let colName = this.filterCol;
      let filteredData = _.filter(this.dataObj, (item) => {
        return Number(item[colName]) == Number(this.filterText);
      })
      console.log(filteredData)
      this.dataSource = new MatTableDataSource(filteredData);
    }
    else if (this.filterName == "greater") {
      let colName = this.filterCol;
      let filteredData = _.filter(this.dataObj, (item) => {
        return Number(item[colName]) >= Number(this.filterText);
      })
      console.log(filteredData)
      this.dataSource = new MatTableDataSource(filteredData);
    }
    else if (this.filterName == "less") {
      let colName = this.filterCol;
      let filteredData = _.filter(this.dataObj, (item) => {
        return Number(item[colName]) <= Number(this.filterText);
      })
      console.log(filteredData)
      this.dataSource = new MatTableDataSource(filteredData);
    }

  }

  clearFilter() {
    this.filterCol= '';
    this.typeOfFilter = '';
    this.filterText = '';
    this.dataSource.filter = '';
    this.dataSource = new MatTableDataSource(this.dataObj);
  }


}
