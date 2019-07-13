import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PruebaGraficaComponent } from './prueba-grafica.component';

describe('PruebaGraficaComponent', () => {
  let component: PruebaGraficaComponent;
  let fixture: ComponentFixture<PruebaGraficaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PruebaGraficaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PruebaGraficaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
