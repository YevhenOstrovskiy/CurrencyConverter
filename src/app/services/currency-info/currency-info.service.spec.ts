import { TestBed } from '@angular/core/testing';
import { CurrencyInfoService } from './currency-info.service';
import { ICurrencyInfo } from '../../models/currencyInfo.model';

describe('CurrencyInfoService', () => {
  let service: CurrencyInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrencyInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a list of currencies', () => {
    const currencies: ICurrencyInfo[] = service.getCurrencies();
    expect(currencies.length).toBeGreaterThan(0);
  });

  it('should return currency data with the correct structure', () => {
    const currencies: ICurrencyInfo[] = service.getCurrencies();
    currencies.forEach(currency => {
      expect(currency).toEqual(jasmine.objectContaining({
        code: jasmine.any(String),
        name: jasmine.any(String),
        country: jasmine.any(String),
        countryCode: jasmine.any(String),
      }));
      if (currency.flag !== undefined) {
        expect(currency.flag).toEqual(jasmine.any(String));
      }
    });
  });

  it('should return correct data for specific currency codes', () => {
    const currencies: ICurrencyInfo[] = service.getCurrencies();
    const usdCurrency = currencies.find(currency => currency.code === 'USD');
    const eurCurrency = currencies.find(currency => currency.code === 'EUR');

    expect(usdCurrency).toBeDefined();
    expect(usdCurrency?.name).toBe('United States Dollar');
    expect(usdCurrency?.country).toBe('United States');

    expect(eurCurrency).toBeDefined();
    expect(eurCurrency?.name).toBe('Euro');
    expect(eurCurrency?.country).toBe('European Union');
  });
});
