import { useMarketCounter, useMarket } from './useBettingContract';
import { useMemo } from 'react';

export function usePlatformStats() {
  const { data: marketCounter, isLoading } = useMarketCounter();

  const totalMarkets = marketCounter ? Number(marketCounter) : 0;

  // Fetch all markets to calculate stats
  const marketIds = Array.from({ length: totalMarkets }, (_, i) => i);

  // Use individual market hooks for each market
  const markets = marketIds.map((id) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data: market } = useMarket(id);
    return market;
  });

  const stats = useMemo(() => {
    let activeMarkets = 0;
    let totalVolume = 0n;
    let resolvedMarkets = 0;

    markets.forEach((market) => {
      if (!market) return;

      const totalPool = market.totalYesBets + market.totalNoBets;
      totalVolume += totalPool;

      if (market.resolved) {
        resolvedMarkets++;
      } else {
        const ended = Number(market.endTime) * 1000 < Date.now();
        if (!ended) {
          activeMarkets++;
        }
      }
    });

    return {
      totalMarkets,
      activeMarkets,
      resolvedMarkets,
      totalVolume,
    };
  }, [markets, totalMarkets]);

  return {
    ...stats,
    isLoading,
  };
}
