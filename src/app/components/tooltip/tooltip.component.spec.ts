import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TooltipComponent, TooltipMessageComponent } from './tooltip.component';
import { Overlay, OverlayModule } from '@angular/cdk/overlay';
import { ICurrency } from '../../models/currency.model';

describe('TooltipComponent', () => {
  let component: TooltipComponent;
  let fixture: ComponentFixture<TooltipComponent>;
  let overlay: Overlay;

  const mockCurrencyData: ICurrency = {
    code: 'USD',
    name: 'US Dollar',
    country: 'United States',
    countryCode: 'US',
    rate: 1.2
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TooltipMessageComponent],
      imports: [OverlayModule, TooltipComponent],
      providers: [Overlay]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TooltipComponent);
    component = fixture.componentInstance;
    overlay = TestBed.inject(Overlay);
    component.currencyData = mockCurrencyData;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render tooltip message with correct currency data', () => {
    component.show();
    fixture.detectChanges();

    const tooltipElement = document.querySelector('.tooltip-content');
    expect(tooltipElement).toBeTruthy();
    expect(tooltipElement?.textContent).toContain('Code: USD');
    expect(tooltipElement?.textContent).toContain('Country: United States');
    expect(tooltipElement?.textContent).toContain('Name: US Dollar');
    expect(tooltipElement?.textContent).toContain('Rate: 1.2');
  });
});

