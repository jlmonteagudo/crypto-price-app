import { Component } from '@angular/core';
import { CryptoPrice } from './interfaces/crypto-price.interface';
import { CryptoPriceService } from './services/crypto-price.service';

@Component({
  selector: 'app-crypto-price',
  template: `
    <table mat-table [dataSource]="cryptoPrices" class="mat-elevation-z8">
      <ng-container matColumnDef="pair">
        <th mat-header-cell *matHeaderCellDef>Pair</th>
        <td mat-cell *matCellDef="let element">{{ element.pair }}</td>
      </ng-container>

      <ng-container matColumnDef="price">
        <th mat-header-cell *matHeaderCellDef class="align-right">Price</th>
        <td mat-cell *matCellDef="let element" align="right">
          {{ element.price | number }}
        </td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
    </table>
  `,
  styles: [
    `
      table {
        width: 300px;
      }

      .align-right {
        text-align: right;
      }
    `,
  ],
})
export class CryptoPriceComponent {
  displayedColumns: string[] = ['pair', 'price'];
  cryptoPrices: CryptoPrice[] = [];

  constructor(private cryptoPriceService: CryptoPriceService) {
    this.cryptoPriceService
      .getPrices()
      .subscribe((cryptoPrices) => (this.cryptoPrices = cryptoPrices));
  }
}
