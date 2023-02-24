import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiveresponsiveComponent } from './diveresponsive.component';

describe('DiveresponsiveComponent', () => {
  let component: DiveresponsiveComponent;
  let fixture: ComponentFixture<DiveresponsiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiveresponsiveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiveresponsiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
