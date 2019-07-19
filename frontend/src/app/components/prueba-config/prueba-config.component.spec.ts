import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PruebaConfigComponent } from './prueba-config.component';

describe('PruebaConfigComponent', () => {
  let component: PruebaConfigComponent;
  let fixture: ComponentFixture<PruebaConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PruebaConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PruebaConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
