import { TestBed } from '@angular/core/testing';

import { LeicaGsiService } from './leica-gsi.service';

describe('LeicaGsiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LeicaGsiService = TestBed.get(LeicaGsiService);
    expect(service).toBeTruthy();
  });
});
