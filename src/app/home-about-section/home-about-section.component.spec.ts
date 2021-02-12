import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeAboutSectionComponent } from './home-about-section.component';

describe('HomeAboutSectionComponent', () => {
  let component: HomeAboutSectionComponent;
  let fixture: ComponentFixture<HomeAboutSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeAboutSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeAboutSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
