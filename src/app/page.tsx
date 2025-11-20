'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import Link from 'next/link';
import { isContractDeployed } from '@/lib/contract';
import { usePlatformStats } from '@/hooks/usePlatformStats';
import { formatEth } from '@/lib/utils';
import { DeploymentGuide } from '@/components';

export default function Home() {
  const { address, isConnected } = useAccount();
  const { totalMarkets, activeMarkets, resolvedMarkets, totalVolume, isLoading } = usePlatformStats();

  const contractDeployed = isContractDeployed();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <header className="border-b border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                VibeCoding Betting
              </h1>
              <span className="px-2 py-1 text-xs font-semibold bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full">
                Base Chain
              </span>
            </div>
            <ConnectButton />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {isConnected ? (
          <div className="space-y-8">
            {!contractDeployed && <DeploymentGuide />}

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                Welcome, {address?.slice(0, 6)}...{address?.slice(-4)}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Connected to Base chain. Start creating or joining betting markets!
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Link href="/markets" className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border-2 border-transparent hover:border-blue-500 transition-all">
                <div className="text-3xl mb-2">📊</div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
                  Active Markets
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  Browse and bet on active prediction markets
                </p>
                <div className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-center">
                  View Markets
                </div>
              </Link>

              <Link href="/create" className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border-2 border-transparent hover:border-green-500 transition-all">
                <div className="text-3xl mb-2">➕</div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
                  Create Market
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  Create your own prediction market
                </p>
                <div className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-center">
                  Create Market
                </div>
              </Link>

              <Link href="/my-bets" className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border-2 border-transparent hover:border-purple-500 transition-all">
                <div className="text-3xl mb-2">📈</div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
                  My Bets
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  View your betting history and winnings
                </p>
                <div className="mt-4 w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-center">
                  My Bets
                </div>
              </Link>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                Platform Stats
              </h2>
              {isLoading ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-pulse">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="text-center">
                      <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-16 mx-auto mb-2"></div>
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20 mx-auto"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">{totalMarkets}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Total Markets</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">{activeMarkets}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Active Markets</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-purple-600">{formatEth(totalVolume)} ETH</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Total Volume</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-orange-600">{resolvedMarkets}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Resolved</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center">
            <div className="text-6xl mb-4">🎲</div>
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">
              Welcome to VibeCoding Betting
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              A decentralized prediction market platform built on Base chain.
              Connect your wallet to get started!
            </p>
            <div className="flex justify-center">
              <ConnectButton />
            </div>
          </div>
        )}
      </main>

      <footer className="border-t border-gray-200 dark:border-gray-700 mt-16">
        <div className="container mx-auto px-4 py-6 text-center text-gray-600 dark:text-gray-400">
          <p>Built on Base Chain | Powered by Solidity & Next.js</p>
        </div>
      </footer>
    </div>
  );
}
