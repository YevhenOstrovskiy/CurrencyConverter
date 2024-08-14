import { Component, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ICurrency } from '../../models/currency.model';

@Component({
  selector: 'app-tooltip',
  standalone: true,
  imports: [],
  templateUrl: './tooltip.component.html',
  styleUrl: './tooltip.component.scss'
})

export class TooltipComponent implements OnDestroy {
  @Input() currencyData!: ICurrency;
  @ViewChild('tooltipTrigger', { static: true }) tooltipTrigger!: ElementRef;

  private overlayRef!: OverlayRef;

  constructor(private overlay: Overlay, private elementRef: ElementRef) {}

  show() {
    const position = this.tooltipTrigger.nativeElement.getBoundingClientRect();
    const positionStrategy = this.overlay.position()
    .global()
    .left(`${position.left}px`)
    .top(`-${position.top - 20}px`);

    this.overlayRef = this.overlay.create({ positionStrategy });

    const tooltipPortal = new ComponentPortal(TooltipMessageComponent);
    const tooltipRef = this.overlayRef.attach(tooltipPortal);
    tooltipRef.instance.currencyData = this.currencyData;
  }

  hide() {
    this.overlayRef.detach();
  }

  ngOnDestroy(): void {
    if (this.overlayRef) {
      this.overlayRef.dispose();
    }
  }
}

@Component({
  selector: 'app-tooltip-message',
  template: `
    <div class="tooltip-content">
      <div><strong>Code:</strong> {{ currencyData.code }}</div>
      <div><strong>Country:</strong> {{ currencyData.country }}</div>
      <div><strong>Country Code:</strong> {{ currencyData.countryCode }}</div>
      <div><strong>Name:</strong> {{ currencyData.name }}</div>
      <div><strong>Rate:</strong> {{ currencyData.rate }}</div>
    </div>
  `,
  styles: [`
    .tooltip-content {
  background-color: #1a1b25;
  color: #e0e0f5;
  padding: 10px 15px;
  border-radius: 8px;
  font-size: 16px;
  max-width: 250px;
  text-align: left;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
  position: relative;
}

.tooltip-content div {
  margin-bottom: 8px;
}

.tooltip-content strong {
  color: #b8b9d8;
  font-weight: bold;
}

.tooltip-content:before {
  content: '';
  position: absolute;
  top: -5px;
  left: 50%;
  transform: translateX(-50%);
  border-width: 5px;
  border-style: solid;
  border-color: transparent transparent #1a1b25 transparent;
}

  `]
})
export class TooltipMessageComponent {
  currencyData!: ICurrency;
}
