import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { CryptoPrice } from '../interfaces/crypto-price.interface';

const PAIRS_MAP = {
  XXBTZUSD: 'BTC/USD',
  XETHZUSD: ' ETH/USD',
  ADAUSD: 'ADA/USD',
  SOLUSD: 'SOL/USD',
  LUNA2USD: 'LUNA2/USD',
};

@Injectable({ providedIn: 'root' })
export class CryptoPriceService {
  constructor(private httpClient: HttpClient) {}

  getPrices(): Observable<CryptoPrice[]> {
    const pairs = Object.keys(PAIRS_MAP).join(',');

    return this.httpClient
      .get<any>(`https://api.kraken.com/0/public/Ticker?pair=${pairs}`)
      .pipe(
        map(({ result }) =>
          Object.keys(PAIRS_MAP).map((pairKey: string) => ({
            pair: PAIRS_MAP[pairKey as keyof typeof PAIRS_MAP],
            price: +result[pairKey].c[0],
          }))
        )
      );
  }
}
