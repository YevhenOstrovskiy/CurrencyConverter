import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { DataService } from '../../services/data/data.service';
import { of } from 'rxjs';
import { ICurrency } from '../../models/currency.model';
import { CommonModule } from '@angular/common';
import { By } from '@angular/platform-browser';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let dataServiceSpy: jasmine.SpyObj<DataService>;

  const mockCurrencies: ICurrency[] = [
    { code: 'USD', name: 'US Dollar', country: 'USA', countryCode: 'US', rate: 1.1, flag: 'us_flag_url' },
    { code: 'EUR', name: 'Euro', country: 'Eurozone', countryCode: 'EU', rate: 0.9, flag: 'eu_flag_url' },
    { code: 'UAH', name: 'Ukrainian Hryvnia', country: 'Ukraine', countryCode: 'UA', rate: 28, flag: 'ua_flag_url' }
  ];

  beforeEach(async () => {
    dataServiceSpy = jasmine.createSpyObj('DataService', ['getCurrencyData']);
    dataServiceSpy.getCurrencyData.and.returnValue(of(mockCurrencies));

    await TestBed.configureTestingModule({
      imports: [CommonModule, HeaderComponent],
      declarations: [],
      providers: [{ provide: DataService, useValue: dataServiceSpy }]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch and set USD and EUR rates on initialization', () => {
    expect(component.usdRate).toEqual(mockCurrencies[0]);
    expect(component.eurRate).toEqual(mockCurrencies[1]);
    expect(component.usdToUah).toBeCloseTo(25.45, 2);
    expect(component.eurToUah).toBe(28);
  });

  it('should display EUR rates in the template', () => {
    const eurRateElement = fixture.debugElement.queryAll(By.css('.currency span'))[3].nativeElement;
    expect(eurRateElement.textContent).toContain('28.00');
  });

  it('should display the correct flags for USD and EUR', () => {
    const usdFlagElement = fixture.debugElement.query(By.css('.currency img')).nativeElement;
    expect(usdFlagElement.src).toContain('us_flag_url');

    const eurFlagElement = fixture.debugElement.queryAll(By.css('.currency img'))[1].nativeElement;
    expect(eurFlagElement.src).toContain('eu_flag_url');
  });

});
