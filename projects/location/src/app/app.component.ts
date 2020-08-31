import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { DialogComponent } from './dialog/dialog.component';
import { IndexedDbService } from 'indexed-db';

@Component({
  selector: 'loc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, AfterContentChecked {
  title = 'QSS Technosoft | feature location';
  data: any;
  res = {
    name: 'dbName',
    store: 'subDbName'
  };
  constructor(
    private _pop: MatDialog,
    private idb: IndexedDbService ){
      this.idb.stream(this.res).then(data => {
        if ( data === undefined || data.length === 0 ) {
          this.data = null;
          return;
        }
        this.data = data;
      });
  }

  ngOnInit() { }

  ngAfterContentChecked() {
    if ( localStorage.getItem('c') === '1' ) {
      localStorage.removeItem('c');
      this.idb.stream(this.res).then(data => {
        localStorage.setItem('t', '1');
        if ( data === undefined || data.length === 0 ) {
          this.data = null;
          return;
        }
        this.data = data;
      });
    }
  }

  modalPopup(e) {
    e.stopPropagation();
    this._pop.open(DialogComponent, { width: '62%', height: '72%', data: undefined });
  }
}
