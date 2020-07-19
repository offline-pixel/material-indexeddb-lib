import { Component, OnInit, ViewChild, Input, OnChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';

import { DialogComponent } from '../dialog/dialog.component';
import { DeleteComponent } from '../delete/delete.component';
import { IndexeddbService } from '../functions/indexeddb.service';

export interface PeriodicElement { }

@Component({
  selector: 'loc-mat-table',
  templateUrl: './mat-table.component.html',
  styleUrls: ['./mat-table.component.scss']
})
export class MatTableComponent implements OnInit, OnChanges {
  @Input() data: any;
  ELEMENT_DATA: PeriodicElement[] = [ ];
  displayedColumns: string[] = ['index', 'locationname', 'addressmain', 'mobilenumber', 'edit'];
  dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);

  @ViewChild( MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private _pop: MatDialog,
    private _idb: IndexeddbService
     ) { }

  ngOnInit(): void {
    this.detectData();
  }

  ngOnChanges() {
    if ( localStorage.getItem('t') === '1' ) {
      localStorage.removeItem('t');
      this.detectData();
    }
  }

  detectData(){
    this.ELEMENT_DATA = this.data;
    this.dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  edit(vData){
    this._pop.open(DialogComponent, { width: '62%', height: '72%', data: vData })
    .afterClosed().subscribe(result => {
      if ( result === undefined || result.length === 0 ) {
        localStorage.setItem('c', '1');
      }
    });
  }
  delete(vData) {
    this._pop.open(DeleteComponent, { width: '35%', height: '24%', data: vData });
  }
}
