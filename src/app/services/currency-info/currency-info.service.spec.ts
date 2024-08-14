import { TestBed } from '@angular/core/testing';

import { CurrencyInfoService } from './currency-info/currency-info.service';

describe('CurrencyInfoService', () => {
  let service: CurrencyInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrencyInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
