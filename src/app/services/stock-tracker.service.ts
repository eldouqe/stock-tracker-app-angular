import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StockTrackerService {
  finnhubApiUrlV1 = `${environment.apiUrlFinnhub}/v1`;
  constructor(private http: HttpClient) {}

  store(symbol: string) {
    this.storeToLocalStorage(symbol);
  }

  private storeToLocalStorage(symbol: string) {
    let symbols: string[] = this.getSymbolsFromLocalStorage();
    if (!symbols.includes(symbol.toUpperCase())) {
      symbols.push(symbol.toUpperCase());
      localStorage.setItem('symbols', JSON.stringify(symbols));
    }
  }

  getSymbolsFromLocalStorage(): string[] {
    let storedSymbols = localStorage.getItem('symbols');
    let symbols: string[] = [];
    if (storedSymbols) {
      symbols = JSON.parse(storedSymbols);
    }
    return symbols;
  }

  getSymbols(): string[] {
    return this.getSymbolsFromLocalStorage();
  }
  getCurrentStocks() {}

  getCurrentStockBySymbol(symbol: string): Observable<Object> {
    return this.http.get(`${this.finnhubApiUrlV1}/quote?symbol=${symbol}`, {
      headers: { add_token_finnhub: 'true' },
    });
  }

  searchCompaniesBySymbol(symbol: string): Observable<Object> {
    return this.http.get(`${this.finnhubApiUrlV1}/search?q=${symbol}`, {
      headers: { add_token_finnhub: 'true' },
    });
  }

  getCompanyNameBySymbol(symbol: string): Observable<string> {
    return this.searchCompaniesBySymbol(symbol).pipe(
      map((res) => {
        let data = res as any;
        let companyName = '';
        if (data?.result?.length > 0) {
          companyName = data.result[0].description;
        }
        return companyName;
      })
    );
  }
}
