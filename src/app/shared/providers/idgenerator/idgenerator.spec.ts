import { TestBed } from '@angular/core/testing';

import { Idgenerator } from './idgenerator';

describe('Idgenerator', () => {
  let service: Idgenerator;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Idgenerator);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
