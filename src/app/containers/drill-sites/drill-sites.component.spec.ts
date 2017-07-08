import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrillSitesComponent } from './drill-sites.component';

describe('DrillSitesComponent', () => {
  let component: DrillSitesComponent;
  let fixture: ComponentFixture<DrillSitesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrillSitesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrillSitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
