import { TestBed } from '@angular/core/testing';

import { TopconService } from './topcon.service';

describe('TopconService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TopconService = TestBed.get(TopconService);
    expect(service).toBeTruthy();
  });
});
