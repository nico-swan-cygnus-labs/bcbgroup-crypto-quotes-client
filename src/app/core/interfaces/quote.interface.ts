// The quotes as expected from the backend
export interface Quote {
    // The crypto symbol
    symbol: string;
    // The currency symbol
    currency: string;
    // The value in the currency for the coin
    price: number;
    // Last movement direction UP,DOWN,UNCHANGED
    direction?: string;
    // Notes about the quote from the server.
    // i.e Is it live data or delayed
    notes?: string;
}
