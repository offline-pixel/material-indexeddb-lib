import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexedDbComponent } from './indexed-db.component';

describe('IndexedDbComponent', () => {
  let component: IndexedDbComponent;
  let fixture: ComponentFixture<IndexedDbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndexedDbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexedDbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
