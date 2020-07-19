import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { DialogComponent } from './dialog/dialog.component';
import { IndexeddbService } from './functions/indexeddb.service';

@Component({
  selector: 'loc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, AfterContentChecked {
  title = 'QSS Technosoft | feature location';
  data: any;
  constructor(
    private _pop: MatDialog,
    private _idb: IndexeddbService ){
      this._idb.createOrRetreive().then(data => {
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
      this._idb.createOrRetreive().then(data => {
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
