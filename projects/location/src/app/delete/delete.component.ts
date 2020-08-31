import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IndexedDbService } from 'indexed-db';

export interface Delete {
  mobilenumber;
}

@Component({
  selector: 'loc-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})

export class DeleteComponent {
  res = {
    name: 'dbName',
    store: 'subDbName',
    key: null
  };
  constructor(
    public dialogRef: MatDialogRef<DeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public mData: Delete,
    private idb: IndexedDbService ) {
  }
  deleteLocation(){
    this.res.key = this.mData.mobilenumber.
    this.idb.deleteId(this.res).then(data => {
      if (data) {
        this.dialogRef.close();
      }
    });
  }
  closeDialog(){
    this.dialogRef.close();
  }
}
