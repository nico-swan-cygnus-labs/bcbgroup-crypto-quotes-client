import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable()
export class DataService {
    private apiBase: string;
    private corsHeaders: HttpHeaders;

    constructor(private http: HttpClient) {
        this.apiBase = environment.api.url;
        this.corsHeaders = new HttpHeaders({
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'Access-Control-Allow-Origin': '*'
        });
    }

    /**
     * Get all the default quotes from te
     * @returns { Observable<Map<string, Map<string, string>>> } The data from the API request
     */
    getAllQuotes(): Observable<Map<string, Map<string, string>>> {
        return this.http.get(`${this.apiBase}/api/quotes`, { headers: this.corsHeaders })
        .pipe(map((response: Map<string, Map<string, string>>)  => response))

    }

    /**
     * Get a latest quote for a symbol currency pair
     * @param { string } _symbol The crypto symbol for the coin
     * @param { string } _currency The currency symbol for the coin
     * @returns { Observable<Object> } The data from the API request
     */
    getQuote(_symbol: string, _currency: string): Observable<Object> {
        return this.http.get(`${this.apiBase}/api/quote/${_symbol}/${_currency}`, { headers: this.corsHeaders });
    }

    /**
     * Get quotes for a list of symbols and currency
     * @param { string[] } _symbols A list of crypto symbols for the coins
     * @param { string[] } _currencies A list or currency symbols for the coins
     * @returns { Observable<Map<string, Map<string, string>>> }The data from the API request
     */
    getQuotes(_symbols: string[], _currencies: string[]): Observable<Map<string, Map<string, string>>> {
        const symbols = _symbols.join(',') || ['BTC', 'ETH'];
        const currencies = _currencies.join(',') || ['USD', 'GBP'];
        return this.http.get(`${this.apiBase}/api/quotes?symbols=${symbols}&currencies=${currencies}`, {
            headers: this.corsHeaders
        })
        .pipe(map((response: Map<string, Map<string, string>>)  => response));
    }

    /**
     * Get get daily history for a symbol and currency pair
     * @param { string } _symbol The crypto symbol for the coin
     * @param { string } _currency The currency symbol for the coin
     * @param { number } _length the number of days
     * @returns { Observable<Object> }The data from the API request
     */
    getDailyHistoryQuote(_symbol: string, _currency: string, _length?: string): Observable<Object> {
        let queryStr = `/quotes/history/daily/${_symbol}/${_currency}`;
        if (_length) {
            queryStr += `?length=${_length}`;
        }
        return this.http.get(`${this.apiBase}${queryStr}`, { headers: this.corsHeaders });
    }

    /**
     * Get a latest trading signals for a symbol
     * @param { string } _symbol The crypto symbol for the coin
     * @returns { Observable<Object> } The data from the API request
     */
    getTradingSignals(_symbol: string): Observable<Object> {
        return this.http.get(`${this.apiBase}/api/trading/signal/${_symbol}`, { headers: this.corsHeaders });
    }
}
