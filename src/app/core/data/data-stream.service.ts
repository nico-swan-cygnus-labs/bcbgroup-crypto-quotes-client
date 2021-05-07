import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as io from 'socket.io-client';
import { environment } from '../../../environments/environment';
import { Quote } from '../interfaces/quote.interface';

@Injectable()
export class DataStreamService {
    private socket: SocketIOClient.Socket;
    cryptoQuotes$ = new BehaviorSubject<Map<string, Map<string, Quote>>>(new Map());
    connected$ = new BehaviorSubject<boolean>(false);

    /**
     * This class manages the connection to the quotes server socket and populate the
     * application state with the latest values
     */
    constructor() {
        // Connect to the server socket
        this.socket = io.connect(environment.socket.url, environment.socket.config);
        // Manage client connections
        this.socket.on('connect', () => this.onSocketConnected());
        // Manage client disconnections
        this.socket.on('disconnect', (reason: string) => this.onSocketDisconnect(reason));
        // Manage quotes received from server
        this.socket.on('quote', (quote: Quote) => {
            this.onUpdateQuote(quote);
        });
        // Handel errors
        this.socket.on('error', (error: Error) => console.error(error));
    }

    /**
     * Handel when the client is connected to the server socket
     * @returns {none}
     */
    private onSocketConnected(): void {
        console.debug('Connected to stream');
        return this.connected$.next(true);
    }

    /**
     * Handel when the client is disconnected from the server socket
     * @param { string } reason The reason given for the disconnection
     */
    private onSocketDisconnect(_reason: string): void {
        console.debug(`Disconnected from stream: ${_reason}`);
        if (_reason === 'io server disconnect') {
            // The disconnection was initiated by the server,
            // you need to reconnect manually
            this.socket.connect();
        }
        // else the socket will automatically try to reconnect
        return this.connected$.next(false);
    }

    /**
     * Initiate disconnection from the socket
     */
    disconnectStream() {
        this.socket.disconnect();
        this.connected$.next(false);
    }

    /**
     * Update the quote state with latest price
     * Usually this is from the socket connections
     * @param { Quote } _quote the quote value from the socket
     */
    private onUpdateQuote(_quote: Quote): void {
        // Get all quotes
        const quotes: Map<string, Map<string, Quote>> = this.cryptoQuotes$.getValue();
        const newPrice = _quote.price;
        let amounts: Map<string, Quote>;

        let newQuote: Quote = {
                    symbol: _quote.symbol,
                    currency: _quote.currency,
                    price: newPrice,
                    direction: 'UNCHANGED',
                    notes: _quote.notes || undefined
                }

        var getDirection = function (_oldPrice, _newPrice) {
            let direction: string = _newPrice > _oldPrice ? 'UP' : 'DOWN';
            if (_newPrice == _oldPrice) {
                direction = 'UNCHANGED';
            }
            return direction;
        }

        // If quote in stream state
        if (quotes.has(_quote.symbol) ) {
            console.debug(`Quote found in stream state. ${_quote.symbol}`);
            amounts = quotes.get(_quote.symbol);

            if (amounts.get(_quote.currency)) {
                const savedQuote: Quote = amounts.get(_quote.currency);
                const direction = getDirection(savedQuote.price, newPrice);
                newQuote.direction = direction

            }
            amounts.set(_quote.currency, newQuote);

        } else {
            console.debug(`Quote not found in stream state adding ${_quote.symbol}.`);
            amounts = new Map().set(_quote.currency, newQuote);
        }
        quotes.set(_quote.symbol, amounts);
        console.debug(quotes);

        return this.cryptoQuotes$.next(quotes);
    }
}
