import { Quote } from 'app/core/interfaces/quote.interface';
import * as QuotesActions from '../actions/quotes.actions';


// The state
export interface State {
    socketConnected?: boolean;
    cryptoQuotes?: Map<string, Map<string, Quote>>;
}

// The initial state when application loads
export const INIT_STATE: State = {
    socketConnected: false
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

        default:
            return state;
    }
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
