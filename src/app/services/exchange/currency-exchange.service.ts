import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyExchangeService {

  private currency1Subject = new BehaviorSubject<string>('');
  private currency2Subject = new BehaviorSubject<string>('');
  private amount1Subject = new BehaviorSubject<number>(0);
  private amount2Subject = new BehaviorSubject<number>(0);

  currency1$ = this.currency1Subject.asObservable();
  currency2$ = this.currency2Subject.asObservable();
  amount1$ = this.amount1Subject.asObservable();
  amount2$ = this.amount2Subject.asObservable();

  setCurrency1(currency: string) {
    this.currency1Subject.next(currency);
  }

  setCurrency2(currency: string) {
    this.currency2Subject.next(currency);
  }

  setAmount1(amount: number) {
    this.amount1Subject.next(amount);
  }

  setAmount2(amount: number) {
    this.amount2Subject.next(amount);
  }

  getCurrency1Value(): string {
    return this.currency1Subject.getValue();
  }

  getCurrency2Value(): string {
    return this.currency2Subject.getValue();
  }

  getAmount1Value(): number {
    return this.amount1Subject.getValue();
  }

  getAmount2Value(): number {
    return this.amount2Subject.getValue();
  }
}
