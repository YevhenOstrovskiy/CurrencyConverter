import { TestBed } from '@angular/core/testing';

import { CurrencyExchangeService } from './services/exchange/currency-exchange.service';

describe('CurrencyExchangeService', () => {
  let service: CurrencyExchangeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrencyExchangeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
