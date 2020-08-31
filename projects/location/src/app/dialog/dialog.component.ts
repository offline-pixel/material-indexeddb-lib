import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, Inject, ElementRef, ViewChild } from '@angular/core';
import { DialogService } from './dialog.service';
import { MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatChipInputEvent} from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IndexedDbService } from 'indexed-db';
import { SchedularComponent } from '../schedular/schedular.component';

export class States {
  name: string;
  abbreviation: string;
}
export class Timezone {
  value: string;
  abbr: string;
  offset: number;
  isdst: boolean;
  text: string;
  utc: Utc;
}
export class Utc { }
export interface Edit {
  pools: string[];
}

@Component({
  selector: 'loc-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
  location: any = new Object();
  states$: Observable<States>;
  timezones$: Observable<Timezone>;
  // zip = new FormControl('', [ Validators.required, Validators.pattern('/((^[0-9]+[a-z]+)|(^[a-z]+[0-9]+))+[0-9a-z]+$/i;')]);
  // usmobile = new FormControl('', [ Validators.required, Validators.pattern('^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$')]);
  // usmobile = new FormControl('', [ Validators.required, Validators.pattern('^(?:\(\d{3}\)|\d{3}-)\d{3}-\d{4}$')]);
  usmobile = new FormControl('', [ Validators.required, Validators.pattern('^[(]{1}[1-9]{1}[0-9]{2}[)]{1}[ ]{1}[0-9]{3}[-]{1}[0-9]{4}$')]);
  zip = new FormControl('', [ Validators.required, Validators.pattern('^[a-z1-9]{1}[a-z0-9]{4,9}$')]);

  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  poolCtrl = new FormControl();
  filteredPools: Observable<string[]>;
  pools: string[] = [];
  allPools: string[] = ['Web designer', 'Analyst', 'Technical Lead', 'Talent Acquisition', 'CEO'];

  mode: any = 'add';
  deepCopy: any;
  res = {
    name: 'dbName',
    store: 'subDbName',
    key: null,
    data: null
  };
  @ViewChild('poolInput') poolInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(
    private _pop: MatDialog,
    private _dialog: DialogService,
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dataToBeEdited: Edit,
    private idb: IndexedDbService ) {
      this.mode = 'add';
      this.states$ = this._dialog._usaStates();
      this.timezones$ = this._dialog._timezones();
      this.filteredPools = this.poolCtrl.valueChanges.pipe(
        startWith(null),
        map((pool: string | null) => pool ? this._filter(pool) : this.allPools.slice()));
      if ( dataToBeEdited !== undefined ) {
        this.mode = 'edit';
        this.location = dataToBeEdited;
        this.pools = dataToBeEdited.pools;
        this.deepCopy = JSON.stringify(dataToBeEdited);
      }
  }
  // appointment pool code
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim()) {
      this.pools.push(value.trim());
    }
    if (input) { input.value = ''; }
    this.poolCtrl.setValue(null);
  }
  remove(pool: string): void {
    const index = this.pools.indexOf(pool);
    if (index >= 0) {
      this.pools.splice(index, 1);
    }
  }
  selected(event: MatAutocompleteSelectedEvent): void {
    this.pools.push(event.option.viewValue);
    this.poolInput.nativeElement.value = '';
    this.poolCtrl.setValue(null);
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allPools.filter(pool => pool.toLowerCase().indexOf(filterValue) === 0);
  }

  addLocation() {
    this.location.pools = this.pools;
    if (this.mode === 'edit') {
      const mob = JSON.parse(this.deepCopy).mobilenumber;
      this.res.key = mob;
      this.res.data = this.location;
      this.idb.updateDB(this.res).then(data => {
        localStorage.setItem('c', '1');
        this.dialogRef.close();
      });
      return;
    }
    this.mode = 'add';
    this.res.key = this.location.mobilenumber;
    this.res.data = this.location;
    this.idb.updateDB(this.res).then(data => {
      localStorage.setItem('c', '1');
      this.dialogRef.close();
    });
  }

  facilityTiming(e) {
    const a = JSON.stringify(this.location.facilitytimes);
    let b = a;
    if ( a !== undefined ) {
      b = JSON.parse(b);
    }
    e.stopPropagation();
    this._pop.open(SchedularComponent, {
      width: '62%',
      height: '80%',
      position: {
        top: '50px'
      },
      data: b
    })
    .afterClosed().subscribe(result => {
      if ( result === undefined || result.data === undefined ) {
        return;
      }
      if ( result.state === 'cancel' ) {
        this.location.facilitytimes = result.freezed;
        return;
      }
      this.location.facilities = `${result.data.length} days slot selected!`;
      this.location.facilitytimes = result.data;
    });
  }
  closeDialog() {
    this.dialogRef.close();
  }
  zipErrorMessage() {
    if (this.zip.hasError('required')) { return 'You must enter a value'; }
    return this.zip.hasError('zip') ? 'Not a valid zip' : 'Not a valid zip';
  }
  usMobileErrorMessage() {
    if (this.usmobile.hasError('required')) { return 'You must enter a value'; }
    return this.usmobile.hasError('usmobile') ? 'Not a valid mobile' : 'Not a valid mobile';
  }

}
