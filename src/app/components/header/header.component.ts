import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data/data.service';
import { CommonModule } from '@angular/common';
import { ICurrency } from '../../models/currency.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  usdToUah: number | null = null;
  eurToUah: number | null = null;
  usdRate: ICurrency | null = null;
  eurRate: ICurrency | null = null;

  constructor(private currenciesService: DataService) {}

  ngOnInit(): void {
    this.currenciesService.getCurrencyData().subscribe((currencies) => {
      const rates = currencies;
      const usdRate = rates.find((currency: ICurrency) => currency.code === 'USD') || null;
      const eurRate = rates.find((currency: ICurrency) => currency.code === 'EUR') || null;
      const uahRate = rates.find((currency: ICurrency) => currency.code === 'UAH') || null;

      this.usdRate = usdRate;
      this.eurRate = eurRate;

      this.usdToUah = uahRate && usdRate ? uahRate?.rate/usdRate?.rate : 1;
      this.eurToUah = uahRate?.rate || 1;
    })
  }
}
