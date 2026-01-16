export interface AnalysisResult {
    ticker?: string;
    macroScore: number;
    macroComment: string;
    techScore: number;
    techComment: string;
    coreTheme: string;
    bullCase: string[];
    bearCase: string[];
    stockStrategy: StockStrategy;
    optionStrategy?: OptionStrategy;
    positionStrategy?: PositionStrategy;
    marketCorrelation?: string;
    market?: string;
    userInfo?: UserInfo;
    isValid?: boolean;
}

export interface UserInfo {
    nickname: string;
    avatarUrl?: string; // Optional
}

export interface StockStrategy {
    direction: string;
    entry: string;
    target: string;
    stop: string;
    invalidation: string;
    rationale: string;
}

export interface OptionStrategy {
    strategyType: string;
    contract: string;
    expiration?: string;
    strikes?: string;
    entry: string;
    target: string;
    stop: string;
}

export interface PositionStrategy {
    scaledEntry: PositionLevel[];
    scaledExit: PositionLevel[];
    averageCost?: string;
    summary?: string;
}

export interface PositionLevel {
    price: string;
    percentage: number;
    note?: string;
}
