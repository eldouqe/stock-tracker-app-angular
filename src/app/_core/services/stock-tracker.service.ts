import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { finalize, map } from 'rxjs/operators';
import { forkJoin, Observable } from 'rxjs';
import { Quote } from '@models/quote';
import { Company } from '@models/company';
import { InsiderSentiment } from '@models/insider-sentiment';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root',
})
export class StockTrackerService {
  finnhubApiUrlV1 = `${environment.apiUrlFinnhub}/v1`;

  constructor(private http: HttpClient, private spinner: NgxSpinnerService) {}

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
    this.spinner.show();
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
      }),
      finalize(() => {
        this.spinner.hide();
      })
    );
  }

  getInsiderSentimentBetweenTwoDatesBySymbol(
    symbol: string,
    from: string,
    to: string
  ): Observable<InsiderSentiment[]> {
    return this.http
      .get<{ data: InsiderSentiment[] }>(
        `${this.finnhubApiUrlV1}/stock/insider-sentiment?symbol=${symbol}&from=${from}&to=${to}`,
        {
          headers: { add_token_finnhub: 'true' },
        }
      )
      .pipe(map((res) => res.data));
  }

  getInsiderSentimentWithCompanyBySymbole(
    symbol: string,
    from: string,
    to: string
  ): Observable<Company> {
    this.spinner.show();
    return forkJoin([
      this.getCompanyBySymbol(symbol),
      this.getInsiderSentimentBetweenTwoDatesBySymbol(symbol, from, to),
    ]).pipe(
      map((res: [Company, InsiderSentiment[]]) => {
        return { ...res[0], insiderSentiment: res[1] };
      }),
      map((res) => {
        if (res.insiderSentiment.length < 3) {
          let countInsiders = 3 - res.insiderSentiment.length;
          for (let i = 3 - countInsiders; i <= 2; i++) {
            var d = new Date(from);
            d.setMonth(d.getMonth() + i + 1);
            res.insiderSentiment.push({
              month: d.getMonth(),
              year: d.getFullYear(),
            });
          }
        }
        return res;
      }),
      finalize(() => {
        this.spinner.hide();
      })
    );
  }
}
