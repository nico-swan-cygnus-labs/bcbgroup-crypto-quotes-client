import { Quote } from 'app/core/interfaces/quote.interface';
import { SymbolHistory } from 'app/core/interfaces/symbol-history.interface';
import { TradingSignal } from 'app/core/interfaces/trading-signal.interface';
import * as QuotesActions from '../actions/quotes.actions';


// The state
export interface State {
    socketConnected?: boolean;
    cryptoQuotes: Map<string, Map<string, Quote>>;
    dailyHistory: Map<string, SymbolHistory>;
    tradingSignals: Map<string, TradingSignal>;
}

// The initial state when application loads
export const INIT_STATE: State = {
    socketConnected: false,
    cryptoQuotes: new Map(),
    dailyHistory: new Map(),
    tradingSignals: new Map()
};

export function reducer(state = INIT_STATE, action: QuotesActions.Actions): State {
    switch (action.type) {
        case QuotesActions.SET_SOCKET_CONNECTED: {
            return handleSetSocketConnect(state, action);
        }
        case QuotesActions.SET_QUOTES: {
            return handleSetQuotes(state, action);
        }
        case QuotesActions.UPDATE_QUOTES_API: {
            return handleUpdateQuotesFromAPI(state, action);
        }

        case QuotesActions.UPDATE_HISTORY_API: {
            return handleUpdateHistoryFromAPI(state, action);
        }
        case QuotesActions.UPDATE_TRADING_SIGNAL_API: {
            return handleUpdateTradingSignalsFromAPI(state, action);
        }

        default:
            return state;
    }
}

function handleUpdateHistoryFromAPI(state: State, action: any  ): State {
    let result: Map<string, SymbolHistory> = new Map();
    const history: SymbolHistory =  {
           symbol: action.payload.symbol,
           currency: action.payload.currency,
           length: action.payload.length,
           data: action.payload.data
    }
    result.set(action.payload.symbol, history);
    return {
        ...state,
        dailyHistory: result
    };
}

function handleUpdateTradingSignalsFromAPI(state: State, action: any  ): State {
    let result: Map<string, TradingSignal> = new Map();
    const signals : TradingSignal = {
        symbol: action.payload.symbol,
        time: action.payload.time,
        signals: action.payload.signals
    }
    result.set(signals.symbol, signals);
    
    return {
        ...state,
        tradingSignals: result
    };
}

function handleUpdateQuotesFromAPI(state: State, action: QuotesActions.UpdateQuotesFromAPI): State {
    let result: Map<string, Map<string, Quote>> = new Map();

    Object.keys(action.payload).forEach(symbol => {
        let currenciesMap: Map<string, Quote> = new Map();
        const currencies: Map<string, string> = action.payload[symbol];
        Object.keys(currencies).forEach(currency => {
           const amount = currencies[currency];
           const quote: Quote = {
                    symbol: symbol,
                    currency: currency,
                    price: parseInt(amount),
                    notes: 'API_RETRIEVED'
                }
                currenciesMap.set(currency,quote);
            });
        result.set(symbol,currenciesMap)
    });
    

    return {
        ...state,
        cryptoQuotes: result
    };
}
function handleSetSocketConnect(state: State, action: QuotesActions.SetSocketConnected): State {
    return {
        ...state,
        socketConnected: action.payload
    };
}

function handleSetQuotes(state: State, action: QuotesActions.SetQuotes): State {
    return {
        ...state,
        cryptoQuotes: action.payload
    };
}

export const getSocketStatus = (state: State): boolean => state.socketConnected;
export const getQuotes = (state: State): Map<string, Map<string, Quote>> => state.cryptoQuotes;

export const getTradingSignals  = (state: State): Object => state.tradingSignals;
export const getDailyHistoryQuote  = (state: State): Object => state.dailyHistory;