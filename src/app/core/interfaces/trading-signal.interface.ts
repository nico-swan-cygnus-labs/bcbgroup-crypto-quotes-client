export interface TradingSignal {
    symbol: string,
    time: number,
    signals: Signal[]
}

export interface Signal {
    name: string,
    sentiment: string,
    score: number
}