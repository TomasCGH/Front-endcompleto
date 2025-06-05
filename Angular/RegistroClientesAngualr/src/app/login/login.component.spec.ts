import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  // Creamos el spy del Router
  let routerSpy = jasmine.createSpyObj('Router', ['navigate']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [
        { provide: Router, useValue: routerSpy }
      ],
      schemas: [NO_ERRORS_SCHEMA] // evita errores si hubiera componentes anidados
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render organization cards', () => {
    const orgCards = fixture.debugElement.queryAll(By.css('.card-org'));
    expect(orgCards.length).toBe(component.organizaciones.length);
  });

  it('should store selected org and navigate on click', () => {
    const testOrg = component.organizaciones[0];
    spyOn(localStorage, 'setItem');

    component.seleccionarOrg(testOrg);

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'orgSeleccionada',
      JSON.stringify(testOrg)
    );
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/dashboard']);
  });

 

  it('should navigate to /registrar when irARegistrar() is called and org exists', () => {
    // 1. Simulamos que ya existe orgSeleccionada en localStorage
    const dummyOrg = { nombre: 'IMMER', imagen: 'x.png', dominio: '@immer.com' };
    localStorage.setItem('orgSeleccionada', JSON.stringify(dummyOrg));

    component.irARegistrar();

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/registrar']);
  });

  it('should alert and not navigate when irARegistrar() is called without any org', () => {
    // 1. Aseguramos que localStorage no tenga la clave
    localStorage.removeItem('orgSeleccionada');
    spyOn(window, 'alert');

    component.irARegistrar();

    expect(window.alert).toHaveBeenCalledWith(
      '⚠️ Solo una organización deportiva puede registrar un encargado.'
    );
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });
});
