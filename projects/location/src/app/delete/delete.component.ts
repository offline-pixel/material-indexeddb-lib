import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IndexeddbService } from '../functions/indexeddb.service';

export interface Delete { }

@Component({
  selector: 'loc-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})

export class DeleteComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Delete,
    private _idb: IndexeddbService ) {
  }
  deleteLocation(){
    this._idb.deleteId(this.data).then(res => {
      if (res) {
        this.dialogRef.close();
      }
    });
  }
  closeDialog(){
    this.dialogRef.close();
  }
}
