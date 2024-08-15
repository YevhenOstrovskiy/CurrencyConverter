import { TestBed } from '@angular/core/testing';
import { TemporaryService } from './temporary-service.service';
import { IExchangeApi } from '../../models/exchangeApi.model';

describe('TemporaryService', () => {
  let service: TemporaryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TemporaryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return temporary data as an observable', () => {
    service.getTemporaryData().subscribe((data: IExchangeApi) => {
      expect(data).toEqual(service['data']);
    });
  });

  it('should return correct success status', () => {
    service.getTemporaryData().subscribe((data: IExchangeApi) => {
      expect(data.success).toBeTrue();
    });
  });

  it('should return correct base currency', () => {
    service.getTemporaryData().subscribe((data: IExchangeApi) => {
      expect(data.base).toBe('EUR');
    });
  });

  it('should return correct exchange rates', () => {
    service.getTemporaryData().subscribe((data: IExchangeApi) => {
      expect(data.rates['USD']).toBe(1.099572);
      expect(data.rates['AED']).toBe(4.038694);
      expect(data.rates['AFN']).toBe(77.528677);
      expect(data.rates['AOA']).toBe(969.272716);
      expect(data.rates['AAA']).toBeUndefined();
    });
  });

  it('should return correct timestamp and date', () => {
    service.getTemporaryData().subscribe((data: IExchangeApi) => {
      expect(data.timestamp).toBe(1723617543);
      expect(data.date).toBe('2024-08-14');
    });
  });
});
