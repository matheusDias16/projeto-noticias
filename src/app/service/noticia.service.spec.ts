import { TestBed } from '@angular/core/testing';

import { NoticiasService } from './noticia.service';

describe('NoticiaService', () => {
  let service: NoticiasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NoticiasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
