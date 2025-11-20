export interface Market {
  id: number;
  creator: string;
  description: string;
  endTime: bigint;
  totalYesBets: bigint;
  totalNoBets: bigint;
  minBet: bigint;
  resolved: boolean;
  winningOutcome: boolean | null;
  createdAt: bigint;
}

export interface Bet {
  marketId: number;
  bettor: string;
  outcome: boolean; // true = YES, false = NO
  amount: bigint;
  timestamp: bigint;
  claimed: boolean;
}

export interface UserBet extends Bet {
  marketDescription: string;
  marketResolved: boolean;
  marketWinningOutcome: boolean | null;
}

export interface MarketStats {
  totalMarkets: number;
  activeMarkets: number;
  totalVolume: bigint;
  totalBettors: number;
}

export type BetOutcome = 'YES' | 'NO';
