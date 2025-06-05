import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarEncargadoComponent } from './registrar-encargado.component';

describe('RegistrarEncargadoComponent', () => {
  let component: RegistrarEncargadoComponent;
  let fixture: ComponentFixture<RegistrarEncargadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrarEncargadoComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(RegistrarEncargadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
