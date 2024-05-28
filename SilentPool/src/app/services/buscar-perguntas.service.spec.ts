import { TestBed } from '@angular/core/testing';

import { BuscarPerguntasService } from './buscar-perguntas.service';

describe('BuscarPerguntasService', () => {
  let service: BuscarPerguntasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuscarPerguntasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
