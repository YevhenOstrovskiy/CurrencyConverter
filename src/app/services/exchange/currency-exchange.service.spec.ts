import { TestBed } from '@angular/core/testing';
import { CurrencyExchangeService } from './currency-exchange.service';

describe('CurrencyExchangeService', () => {
  let service: CurrencyExchangeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrencyExchangeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set and get currency1 correctly', () => {
    service.setCurrency1('USD');
    service.currency1$.subscribe((currency) => {
      expect(currency).toBe('USD');
    });
    expect(service.getCurrency1Value()).toBe('USD');
  });

  it('should set and get currency2 correctly', () => {
    service.setCurrency2('EUR');
    service.currency2$.subscribe((currency) => {
      expect(currency).toBe('EUR');
    });
    expect(service.getCurrency2Value()).toBe('EUR');
  });

  it('should set and get amount1 correctly', () => {
    service.setAmount1(100);
    service.amount1$.subscribe((amount) => {
      expect(amount).toBe(100);
    });
    expect(service.getAmount1Value()).toBe(100);
  });

  it('should set and get amount2 correctly', () => {
    service.setAmount2(200);
    service.amount2$.subscribe((amount) => {
      expect(amount).toBe(200);
    });
    expect(service.getAmount2Value()).toBe(200);
  });

  it('should emit new value when currency1 is set', (done) => {
    service.currency1$.subscribe((currency) => {
      if (currency === 'UAH') {
        expect(currency).toBe('UAH');
        done();
      }
    });
    service.setCurrency1('UAH');
  });

  it('should emit new value when currency2 is set', (done) => {
    service.currency2$.subscribe((currency) => {
      if (currency === 'JPY') {
        expect(currency).toBe('JPY');
        done();
      }
    });
    service.setCurrency2('JPY');
  });

  it('should emit new value when amount1 is set', (done) => {
    service.amount1$.subscribe((amount) => {
      if (amount === 300) {
        expect(amount).toBe(300);
        done();
      }
    });
    service.setAmount1(300);
  });

  it('should emit new value when amount2 is set', (done) => {
    service.amount2$.subscribe((amount) => {
      if (amount === 400) {
        expect(amount).toBe(400);
        done();
      }
    });
    service.setAmount2(400);
  });
});
