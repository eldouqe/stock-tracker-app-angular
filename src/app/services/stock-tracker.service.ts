import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { forkJoin, Observable } from 'rxjs';
import { Company } from '../_core/models/Company';
import { Quote } from '../_core/models/quote';

@Injectable({
  providedIn: 'root',
})
export class StockTrackerService {
  finnhubApiUrlV1 = `${environment.apiUrlFinnhub}/v1`;

  constructor(private http: HttpClient) {}

  getSymbolsFromLocalStorage(): string[] {
    let storedSymbols = localStorage.getItem('symbols');
    let symbols: string[] = [];
    if (storedSymbols) {
      symbols = JSON.parse(storedSymbols);
    }
    return symbols;
  }

  private storeToLocalStorage(symbol: string): boolean {
    let isStored: boolean = false;
    let symbols: string[] = this.getSymbolsFromLocalStorage();
    if (!symbols.includes(symbol.toUpperCase())) {
      symbols.push(symbol.toUpperCase());
      localStorage.setItem('symbols', JSON.stringify(symbols));
      isStored = true;
    }
    return isStored;
  }

  store(symbol: string): boolean {
    return this.storeToLocalStorage(symbol);
  }

  storeAllCompanies(companies: Company[]) {
    this.storeAllCompaniesToLocalStorage(companies);
  }

  storeAllCompaniesToLocalStorage(companies: Company[]) {
    let symbols: string[] = [];
    companies.forEach((el) => {
      if (el?.symbol) {
        symbols.push(el?.symbol);
      }
    });
    if (symbols.length > 0) {
      localStorage.setItem('symbols', JSON.stringify(symbols));
    } else {
      localStorage.setItem('symbols', JSON.stringify([]));
    }
  }

  getSymbols(): string[] {
    return this.getSymbolsFromLocalStorage();
  }

  getCurrentStockBySymbol(symbol: string): Observable<Quote> {
    return this.http.get<Quote>(
      `${this.finnhubApiUrlV1}/quote?symbol=${symbol}`,
      {
        headers: { add_token_finnhub: 'true' },
      }
    );
  }

  searchCompaniesBySymbol(symbol: string): Observable<Company> {
    return this.http
      .get(`${this.finnhubApiUrlV1}/search?q=${symbol}`, {
        headers: { add_token_finnhub: 'true' },
      })
      .pipe(
        map((res: any) => {
          return res.result;
        })
      );
  }

  getCompanyBySymbol(symbol: string): Observable<Company> {
    return this.searchCompaniesBySymbol(symbol).pipe(
      map((res: any) => {
        let company: Company = {};
        if (res?.length > 0) {
          company = { ...res[0] };
        }
        return company;
      })
    );
  }

  combineGetCurrentStockAndGetCompany(
    symbol: string
  ): Observable<[Quote, Company]> {
    return forkJoin([
      this.getCurrentStockBySymbol(symbol),
      this.getCompanyBySymbol(symbol),
    ]);
  }

  getCurrentStocksbySymbols(symbols: string[]) {
    let requestArray: Observable<[Quote, Company]>[] = [];
    symbols.forEach((element) => {
      requestArray.push(this.combineGetCurrentStockAndGetCompany(element));
    });
    return forkJoin(requestArray).pipe(
      map((res: [Quote, Company][]) => {
        let arr: Company[] = [];
        res.forEach((el) => {
          arr.push({ ...el[1], quote: el[0] });
        });
        return arr;
      })
    );
  }
}
