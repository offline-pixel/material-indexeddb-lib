import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface EditFacility {
  schedular: string[];
}
@Component({
  selector: 'loc-schedular',
  templateUrl: './schedular.component.html',
  styleUrls: ['./schedular.component.scss']
})
export class SchedularComponent implements OnInit {
  schedularData: Array<any> = [];
  schedular: any = [
    { index: 0, freq: 'Sun', from: null, to: null },
    { index: 1, freq: 'Mon', from: null, to: null },
    { index: 2, freq: 'Tue', from: null, to: null },
    { index: 3, freq: 'Wed', from: null, to: null },
    { index: 4, freq: 'Thu', from: null, to: null },
    { index: 5, freq: 'Fri', from: null, to: null },
    { index: 6, freq: 'Sat', from: null, to: null }
  ];
  freezeSchedular; any;
  constructor(
    public dialogRef: MatDialogRef<SchedularComponent>,
    @Inject(MAT_DIALOG_DATA) data: EditFacility
  ) {
    if ( data !== undefined ) {
      const arr: any = data;
      this.schedular.filter(o1 => {
        return !arr.some( o2 => {
          return o1.index === o2.index;
        });
      }).map(el => arr.splice(el.index, 0, el) );
      this.schedular = arr;
      this.freezeSchedular = JSON.stringify(arr);
    }
  }

  ngOnInit(): void { }
  selectedSchedulars(i: any, e: boolean){
    if (e) {
      this.schedularData.push(i);
      return;
    }
    const index = this.schedularData.indexOf(i);
    this.schedularData.splice(index, 1);
  }
  checkAll(d) {
    this.schedularData.forEach(index => {
      this.schedular[index].from = d.from;
      this.schedular[index].to = d.to;
    });
  }
  setTwelveHourFormat(day: any, type: string){
    if ( day[type] ) {
      const res = day[type].split(':');
      let h = 0;
      if ( parseInt(res[0], 10) >  12 ) {
        h = parseInt(res[0], 10) - 12;
        day[type] = `0${h}:${res[1]}`;
        this.schedular[day.index] = day;
      }
    }
  }
  checkSchedular(state) {
    const arr = [];
    this.schedular.forEach(data => {
      if ( data.from !== null && data.to !== null ) {
        arr.push(data);
      }
    });
    if ( this.freezeSchedular !== undefined ) {
      this.dialogRef.close({ data: arr, state, freezed: JSON.parse(this.freezeSchedular) });
      return;
    }
    this.dialogRef.close({ data: arr, state, freezed: this.freezeSchedular });
  }

}
