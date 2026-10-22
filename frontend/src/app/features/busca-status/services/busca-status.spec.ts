import { TestBed } from '@angular/core/testing';

import { BuscaStatus } from './busca-status';

describe('BuscaStatus', () => {
  let service: BuscaStatus;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuscaStatus);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
