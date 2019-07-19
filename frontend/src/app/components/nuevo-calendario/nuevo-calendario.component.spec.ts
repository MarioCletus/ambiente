import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoCalendarioComponent } from './nuevo-calendario.component';

describe('NuevoCalendarioComponent', () => {
  let component: NuevoCalendarioComponent;
  let fixture: ComponentFixture<NuevoCalendarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevoCalendarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoCalendarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
