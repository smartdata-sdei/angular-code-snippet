import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeTopSuppliarsComponent } from './home-top-suppliars.component';

describe('HomeTopSuppliarsComponent', () => {
  let component: HomeTopSuppliarsComponent;
  let fixture: ComponentFixture<HomeTopSuppliarsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeTopSuppliarsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeTopSuppliarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
