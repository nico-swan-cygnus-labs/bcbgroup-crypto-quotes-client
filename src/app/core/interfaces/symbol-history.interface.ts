export interface SymbolHistory {
    symbol: string,
    currency: string,
    length: number,
    data: SymbolHistoryData[]
}

export interface SymbolHistoryData {
    time: number,
    value: number
}