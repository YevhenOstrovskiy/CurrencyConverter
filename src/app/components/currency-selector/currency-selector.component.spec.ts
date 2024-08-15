import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CurrencySelectorComponent } from './currency-selector.component';
import { DataService } from '../../services/data/data.service';
import { CurrencyExchangeService } from '../../services/exchange/currency-exchange.service';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TooltipComponent } from '../tooltip/tooltip.component';
import { ICurrency } from '../../models/currency.model';

describe('CurrencySelectorComponent', () => {
  let component: CurrencySelectorComponent;
  let fixture: ComponentFixture<CurrencySelectorComponent>;
  let dataServiceSpy: jasmine.SpyObj<DataService>;
  let exchangeServiceSpy: jasmine.SpyObj<CurrencyExchangeService>;

  const mockRates: ICurrency[] = [
    { code: 'USD', name: 'US Dollar', country: 'USA', countryCode: 'US', rate: 1.1, flag: 'us_flag_url' },
    { code: 'EUR', name: 'Euro', country: 'Eurozone', countryCode: 'EU', rate: 0.9, flag: 'eu_flag_url' }
  ];

  beforeEach(async () => {
    const dataService = jasmine.createSpyObj('DataService', ['getCurrencyData']);
    const exchangeService = jasmine.createSpyObj('CurrencyExchangeService', [
      'currency1$',
      'currency2$',
      'amount1$',
      'amount2$',
      'setCurrency1',
      'setCurrency2',
      'setAmount1',
      'setAmount2',
      'getCurrency1Value',
      'getCurrency2Value'
    ]);

    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        CommonModule,
        CurrencySelectorComponent,
        TooltipComponent
      ],
      providers: [
        { provide: DataService, useValue: dataService },
        { provide: CurrencyExchangeService, useValue: exchangeService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CurrencySelectorComponent);
    component = fixture.componentInstance;
    dataServiceSpy = TestBed.inject(DataService) as jasmine.SpyObj<DataService>;
    exchangeServiceSpy = TestBed.inject(CurrencyExchangeService) as jasmine.SpyObj<CurrencyExchangeService>;

    dataServiceSpy.getCurrencyData.and.returnValue(of(mockRates));
    exchangeServiceSpy.currency1$ = of('USD');
    exchangeServiceSpy.amount1$ = of(100);
    exchangeServiceSpy.getCurrency1Value.and.returnValue('USD');
    exchangeServiceSpy.getCurrency2Value.and.returnValue('EUR');

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch and set currency data on initialization', () => {
    expect(dataServiceSpy.getCurrencyData).toHaveBeenCalled();
    expect(component.rates).toEqual(mockRates);
  });

  it('should update selected option and call setCurrency1 when onOptionChange is triggered with currencyIndex 1', () => {
    component.currencyIndex = 1;
    component.onOptionChange('EUR');
    expect(component.selectedOption).toBe('EUR');
    expect(exchangeServiceSpy.setCurrency1).toHaveBeenCalledWith('EUR');
    expect(exchangeServiceSpy.setAmount2).toHaveBeenCalled();
  });

  it('should update amount and call setAmount1 when onAmountChange is triggered with currencyIndex 1', () => {
    component.currencyIndex = 1;
    component.onAmountChange(200);
    expect(component.inputValue).toBe(200);
    expect(exchangeServiceSpy.setAmount1).toHaveBeenCalledWith(200);
    expect(exchangeServiceSpy.setAmount2).toHaveBeenCalled();
  });

  it('should return undefined when getSelectedFlag is called with no selected currency', () => {
    component.selectedOption = 'GBP';
    const flag = component.getSelectedFlag();
    expect(flag).toBeUndefined();
  });

  it('should return the correct currency object when getCurrency is called', () => {
    component.selectedOption = 'USD';
    const currency = component.getCurrency();
    expect(currency).toEqual(mockRates[0]);
  });
});
