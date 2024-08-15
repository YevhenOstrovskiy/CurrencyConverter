import { TestBed } from '@angular/core/testing';
import { DataService } from './data.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CurrencyInfoService } from '../currency-info/currency-info.service';
import { TemporaryService } from '../temporary/temporary-service.service';
import { IExchangeApi } from '../../models/exchangeApi.model';
import { ICurrency } from '../../models/currency.model';
import { environment } from '../../../environments/environment';
import { of } from 'rxjs';

describe('DataService', () => {
  let service: DataService;
  let httpMock: HttpTestingController;
  let currencyInfoServiceSpy: jasmine.SpyObj<CurrencyInfoService>;
  let temporaryDataSpy: jasmine.SpyObj<TemporaryService>;

  const mockExchangeData: IExchangeApi = {
    success: true,
    timestamp:1723705817,
    rates: {
      USD: 1.1,
      EUR: 0.9
    },
    base: 'USD',
    date: '2024-08-15'
  };

  const mockCurrencyInfo: ICurrency[] = [
    { code: 'USD', rate: 12, name: 'US Dollar', country: 'USA', countryCode: 'US', flag: 'us_flag_url' },
    { code: 'EUR', rate: 16, name: 'Euro', country: 'Eurozone', countryCode: 'EU', flag: 'eu_flag_url' }
  ];

  beforeEach(() => {
    const currencyInfoSpy = jasmine.createSpyObj('CurrencyInfoService', ['getCurrencies']);
    const temporaryServiceSpy = jasmine.createSpyObj('TemporaryService', ['getTemporaryData']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        DataService,
        { provide: CurrencyInfoService, useValue: currencyInfoSpy },
        { provide: TemporaryService, useValue: temporaryServiceSpy }
      ]
    });

    service = TestBed.inject(DataService);
    httpMock = TestBed.inject(HttpTestingController);
    currencyInfoServiceSpy = TestBed.inject(CurrencyInfoService) as jasmine.SpyObj<CurrencyInfoService>;
    temporaryDataSpy = TestBed.inject(TemporaryService) as jasmine.SpyObj<TemporaryService>;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should handle error and return temporary data', () => {
    const mockTemporaryData: IExchangeApi = {
      success: true,
      timestamp:1723705817,
      rates: {
        GBP: 0.8
      },
      base: 'USD',
      date: '2024-08-15'
    };

    temporaryDataSpy.getTemporaryData.and.returnValue(of(mockTemporaryData));

    service.getData().subscribe(data => {
      expect(data).toEqual(mockTemporaryData);
      expect(temporaryDataSpy.getTemporaryData).toHaveBeenCalled();
    });

    const req = httpMock.expectOne(`${service['apiUrl']}`);
    req.error(new ErrorEvent('Network error'));
  });

  it('should map exchange data to currency data', () => {
    currencyInfoServiceSpy.getCurrencies.and.returnValue(mockCurrencyInfo);

    service.getCurrencyData().subscribe(data => {
      expect(data).toEqual([
        { code: 'USD', rate: 1.1, name: 'US Dollar', country: 'USA', countryCode: 'US', flag: 'us_flag_url' },
        { code: 'EUR', rate: 0.9, name: 'Euro', country: 'Eurozone', countryCode: 'EU', flag: 'eu_flag_url' }
      ]);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}`);
    req.flush(mockExchangeData);
  });

  it('should handle missing currency info gracefully', () => {
    const incompleteCurrencyInfo = [{ code: 'USD', name: 'US Dollar', country: 'USA', countryCode: 'US', flag: 'us_flag_url' }];
    currencyInfoServiceSpy.getCurrencies.and.returnValue(incompleteCurrencyInfo);

    service.getCurrencyData().subscribe(data => {
      expect(data).toEqual([
        { code: 'USD', rate: 1.1, name: 'US Dollar', country: 'USA', countryCode: 'US', flag: 'us_flag_url' },
        { code: 'EUR', rate: 0.9, name: 'Unknown', country: 'Unknown', countryCode: '', flag: `${environment.BASE_FLAG}` }
      ]);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}`);
    req.flush(mockExchangeData);
  });
});
