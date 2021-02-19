import { TestBed } from '@angular/core/testing';

import { AnprService } from './anpr.service';

describe('AnprService', () => {
  let service: AnprService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnprService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
