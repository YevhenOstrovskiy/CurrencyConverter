import { Injectable } from '@angular/core';
import { IExchangeApi } from '../../models/exchangeApi.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TemporaryService {

  private data: IExchangeApi = {
      "success": true,
      "timestamp": 1723617543,
      "base": "EUR",
      "date": "2024-08-14",
      "rates": {
        "AED": 4.038694,
        "AFN": 77.528677,
        "ALL": 99.936056,
        "AMD": 423.952959,
        "ANG": 1.969311,
        "AOA": 969.272716,
        "ARS": 1033.308443,
        "AUD": 1.658092,
        "AWG": 1.981978,
        "AZN": 1.877902,
        "BAM": 1.956506,
        "BBD": 2.206296,
        "BDT": 128.396324,
        "BGN": 1.956792,
        "BHD": 0.414468,
        "BIF": 3150.008117,
        "BMD": 1.099572,
        "BND": 1.445654,
        "BOB": 7.550724,
        "BRL": 6.000693,
        "BSD": 1.092694,
        "BTC": 0.000018072618,
        "BTN": 91.760006,
        "BWP": 14.756458,
        "BYN": 3.57599,
        "BYR": 21551.60565,
        "BZD": 2.202595,
        "CAD": 1.508239,
        "CDF": 3155.770779,
        "CHF": 0.951195,
        "CLF": 0.037135,
        "CLP": 1024.66916,
        "CNY": 7.866225,
        "CNH": 7.860338,
        "COP": 4438.938034,
        "CRC": 578.608757,
        "CUC": 1.099572,
        "CUP": 29.13865,
        "CVE": 110.304797,
        "CZK": 25.19334,
        "DJF": 194.580203,
        "DKK": 7.462474,
        "DOP": 65.193521,
        "DZD": 147.628976,
        "EGP": 54.263929,
        "ERN": 16.493576,
        "ETB": 113.274369,
        "EUR": 1,
        "FJD": 2.461061,
        "FKP": 0.85604,
        "GBP": 0.857072,
        "GEL": 2.963276,
        "GGP": 0.85604,
        "GHS": 17.079162,
        "GIP": 0.85604,
        "GMD": 75.870324,
        "GNF": 9420.484511,
        "GTQ": 8.463053,
        "GYD": 228.572467,
        "HKD": 8.566142,
        "HNL": 27.066765,
        "HRK": 7.551956,
        "HTG": 143.855827,
        "HUF": 393.085599,
        "IDR": 17225.450687,
        "ILS": 4.097977,
        "IMP": 0.85604,
        "INR": 92.297555,
        "IQD": 1431.403421,
        "IRR": 46283.716352,
        "ISK": 151.707959,
        "JEP": 0.85604,
        "JMD": 171.571902,
        "JOD": 0.779264,
        "JPY": 161.801425,
        "KES": 141.570461,
        "KGS": 94.203281,
        "KHR": 4470.734983,
        "KMF": 493.652955,
        "KPW": 989.614457,
        "KRW": 1495.780079,
        "KWD": 0.336601,
        "KYD": 0.910629,
        "KZT": 524.6793,
        "LAK": 24201.731794,
        "LBP": 98481.948955,
        "LKR": 326.944986,
        "LRD": 213.629019,
        "LSL": 19.879772,
        "LTL": 3.246749,
        "LVL": 0.66512,
        "LYD": 5.254896,
        "MAD": 10.733573,
        "MDL": 19.22076,
        "MGA": 4992.801363,
        "MKD": 61.575696,
        "MMK": 3571.366044,
        "MNT": 3736.344042,
        "MOP": 8.766583,
        "MRU": 43.29262,
        "MUR": 50.822276,
        "MVR": 16.943863,
        "MWK": 1894.783623,
        "MXN": 20.874378,
        "MYR": 4.868351,
        "MZN": 70.262623,
        "NAD": 19.879772,
        "NGN": 1748.319078,
        "NIO": 40.224879,
        "NOK": 11.800945,
        "NPR": 146.81597,
        "NZD": 1.829489,
        "OMR": 0.423222,
        "PAB": 1.092694,
        "PEN": 4.092777,
        "PGK": 4.303592,
        "PHP": 62.75091,
        "PKR": 304.540145,
        "PLN": 4.285983,
        "PYG": 8262.981219,
        "QAR": 3.986238,
        "RON": 4.975339,
        "RSD": 117.01859,
        "RUB": 101.159278,
        "RWF": 1440.419692,
        "SAR": 4.128121,
        "SBD": 9.358735,
        "SCR": 15.450277,
        "SDG": 661.396107,
        "SEK": 11.507051,
        "SGD": 1.448768,
        "SHP": 0.85604,
        "SLE": 25.122248,
        "SLL": 23057.43415,
        "SOS": 624.525324,
        "SRD": 31.522494,
        "STD": 22758.914512,
        "SVC": 9.56145,
        "SYP": 2762.707139,
        "SZL": 19.875352,
        "THB": 38.467967,
        "TJS": 11.593477,
        "TMT": 3.848501,
        "TND": 3.370016,
        "TOP": 2.602522,
        "TRY": 36.902398,
        "TTD": 7.416608,
        "TWD": 35.492521,
        "TZS": 2979.839589,
        "UAH": 45.184802,
        "UGX": 4075.470398,
        "USD": 1.099572,
        "UYU": 43.955859,
        "UZS": 13801.979646,
        "VEF": 3983256.309545,
        "VES": 40.255644,
        "VND": 27585.505446,
        "VUV": 130.543329,
        "WST": 3.079815,
        "XAF": 656.19375,
        "XAG": 0.039522,
        "XAU": 0.000446,
        "XCD": 2.971648,
        "XDR": 0.819096,
        "XOF": 656.19375,
        "XPF": 119.331742,
        "YER": 275.305217,
        "ZAR": 19.919402,
        "ZMK": 9897.465781,
        "ZMW": 28.5473,
        "ZWL": 354.061644
    }
  }

  getTemporaryData(): Observable<IExchangeApi> {
    return of(this.data);
  }
}
