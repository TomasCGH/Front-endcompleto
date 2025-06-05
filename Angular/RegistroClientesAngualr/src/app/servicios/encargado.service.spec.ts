import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { EncargadoService } from './encargado.service';

describe('EncargadoService', () => {
  let service: EncargadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EncargadoService]
    });
    service = TestBed.inject(EncargadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
