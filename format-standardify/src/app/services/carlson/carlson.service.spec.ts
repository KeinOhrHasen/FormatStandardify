import { TestBed } from '@angular/core/testing';

import { CarlsonService } from './carlson.service';

describe('CarlsonService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CarlsonService = TestBed.get(CarlsonService);
    expect(service).toBeTruthy();
  });
});
