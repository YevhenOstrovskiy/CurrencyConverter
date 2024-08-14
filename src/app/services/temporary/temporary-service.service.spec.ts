import { TestBed } from '@angular/core/testing';

import { TemporaryServiceService } from './temporary-service.service';

describe('TemporaryServiceService', () => {
  let service: TemporaryServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TemporaryServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
