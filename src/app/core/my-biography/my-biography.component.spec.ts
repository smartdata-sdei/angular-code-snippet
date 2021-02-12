import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyBiographyComponent } from './my-biography.component';

describe('MyBiographyComponent', () => {
  let component: MyBiographyComponent;
  let fixture: ComponentFixture<MyBiographyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyBiographyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyBiographyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
