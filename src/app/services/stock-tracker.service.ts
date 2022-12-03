import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StockTrackerService {
  constructor() {}

  store(symbol: string) {
    this.storeToLocalStorage(symbol);
  }

  private storeToLocalStorage(symbol: string) {
    let storedSymbols = localStorage.getItem('symbols');
    let symbols: string[] = [];
    if (storedSymbols) {
      symbols = JSON.parse(storedSymbols);
    }
    if (!symbols.includes(symbol.toUpperCase())) {
      symbols.push(symbol.toUpperCase());
      localStorage.setItem('symbols', JSON.stringify(symbols));
    }
  }
}
