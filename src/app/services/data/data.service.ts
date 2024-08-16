import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { combineLatest, Observable, of, ReplaySubject } from 'rxjs';
import { tap, map, catchError, switchMap } from 'rxjs/operators';
import { IExchangeApi } from '../../models/exchangeApi.model';
import { environment } from '../../../environments/environment';
import { ICurrency } from '../../models/currency.model';
import { CurrencyInfoService } from '../currency-info/currency-info.service';
import { TemporaryService } from '../temporary/temporary-service.service';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiUrl = `https://api.exchangeratesapi4444.io/v1/latest?access_key=${environment.ACCESS_KEY}`;
  private currencies$: ReplaySubject<IExchangeApi> = new ReplaySubject(1)

  constructor(
    private http: HttpClient,
    private currencyInfoService: CurrencyInfoService,
    private temporaryData: TemporaryService
  ) {}

  getData(): Observable<IExchangeApi> {
    return this.http.get<IExchangeApi>(this.apiUrl).pipe(
      tap(data => this.currencies$.next(data)),
      catchError(() => {
        console.log('ERROR to get data from API, max number of free requests');
        return this.temporaryData.getTemporaryData();
      })
    );
  }

  getCurrencyData(): Observable<ICurrency[]> {
    return this.getData().pipe(
      switchMap(exchangeData =>
        combineLatest([of(exchangeData), of(this.currencyInfoService.getCurrencies())])
      ),
      map(([exchangeData, currencyInfo]) => {
        return Object.keys(exchangeData.rates).map(code => {
          const info = currencyInfo.find(c => c.code === code);
          return {
            code: code,
            rate: exchangeData.rates[code],
            name: info?.name || 'Unknown',
            country: info?.country || 'Unknown',
            countryCode: info?.countryCode || '',
            flag: info?.flag || `${environment.BASE_FLAG}`
          };
        });
      })
    );
  }
}
