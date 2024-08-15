import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../services/data/data.service';
import { CurrencyExchangeService } from '../../services/exchange/currency-exchange.service';
import { ICurrency } from '../../models/currency.model';
import { TooltipComponent } from '../tooltip/tooltip.component';

@Component({
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    TooltipComponent
  ],
  selector: 'app-currency-selector',
  templateUrl: './currency-selector.component.html',
  styleUrls: ['./currency-selector.component.scss']
})
export class CurrencySelectorComponent implements OnInit {
  @Input() currencyIndex = 1;

  inputValue = 0;
  selectedOption = '';
  amount = 0;
  rates: ICurrency[] = [];

  constructor(private currenciesService: DataService, private exchangeService: CurrencyExchangeService) {}

  ngOnInit(): void {
    this.currenciesService.getCurrencyData().subscribe(data => {
      this.rates = data;
    });

    if (this.currencyIndex === 1) {
      this.exchangeService.currency1$.subscribe(currency => this.selectedOption = currency);
      this.exchangeService.amount1$.subscribe(amount => this.inputValue = amount);
    } else {
      this.exchangeService.currency2$.subscribe(currency => this.selectedOption = currency);
      this.exchangeService.amount2$.subscribe(amount => this.inputValue = amount);
    }
  }

  onOptionChange(option: string) {
    this.selectedOption = option;
    if (this.currencyIndex === 1) {
      this.exchangeService.setCurrency1(option);
    } else {
      this.exchangeService.setCurrency2(option);
    }
    this.calculateExchangeRate();
    this.updateAmount();
  }

  onAmountChange(amount: number) {
    this.inputValue = amount;
    if (this.currencyIndex === 1) {
      this.exchangeService.setAmount1(amount);
    } else {
      this.exchangeService.setAmount2(amount);
    }
    this.calculateExchangeRate();
    this.updateAmount();
  }

  private calculateExchangeRate() {
    const currency1Rate = this.getCurrencyRate(this.exchangeService.getCurrency1Value());
    const currency2Rate = this.getCurrencyRate(this.exchangeService.getCurrency2Value());

    if (this.currencyIndex === 1) {
      if (currency1Rate && currency2Rate) {
        const newAmount2 = (this.inputValue / currency1Rate) * currency2Rate;
        this.exchangeService.setAmount2(this.formatToTwoDecimals(newAmount2));
      }
    } else {
      if (currency1Rate && currency2Rate) {
        const newAmount1 = (this.inputValue / currency2Rate) * currency1Rate;
        this.exchangeService.setAmount1(this.formatToTwoDecimals(newAmount1));
      }
    }
  }

  private updateAmount() {
    const selectedCurrency = this.rates.find(rate => rate.code === this.selectedOption);
    if (selectedCurrency) {
      this.amount = selectedCurrency.rate;
    } else {
      this.amount = 0;
    }
  }

  private getCurrencyRate(code: string): number {
    const currency = this.rates.find(rate => rate.code === code);
    return currency ? currency.rate : 0;
  }

  formatToTwoDecimals(value: number): number {
    return Math.round(value * 100) / 100;
  }

  getSelectedFlag(): string | undefined {
    const selectedRate = this.rates.find(rate => rate.code === this.selectedOption);
    return selectedRate ? selectedRate.flag : undefined;
  }

  get displayValue(): string {
    return this.inputValue === 0 ? '' : this.inputValue.toString();
  }

  getCurrency(): ICurrency {
    const selectedRate = this.rates.find(rate => rate.code === this.selectedOption) ||
    {
    code: "",
    country: "",
    countryCode: "",
    name: "",
    rate: 0
    };
    return selectedRate;
  }
}
