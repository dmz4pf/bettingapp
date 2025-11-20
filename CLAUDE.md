# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

VibeCoding Betting App is a decentralized prediction market platform built on Base chain (Ethereum L2) where users create and participate in peer-to-peer binary (YES/NO) betting markets.

**Tech Stack:** Next.js 14 (App Router) + TypeScript + wagmi v2 + RainbowKit + Solidity + Foundry

## Common Commands

### Frontend Development
```bash
npm run dev          # Start development server (http://localhost:3000)
npm run build        # Build for production
npm run start        # Run production build
npm run lint         # Run ESLint
```

### Smart Contract Development
```bash
cd contracts
forge build          # Compile contracts
forge test           # Run all tests
forge test -vvv      # Run tests with verbose output
forge test --match-test testName  # Run specific test

# Deploy to Base Sepolia
forge script script/Deploy.s.sol:DeployScript --rpc-url base_sepolia --broadcast --verify
```

## Architecture Overview

### Dual-Component Structure

The project consists of two main components that work together:

1. **Smart Contracts (`contracts/`)** - Foundry-based Solidity contracts
   - `BettingMarket.sol` - Main contract handling all betting logic
   - `BettingMarket.t.sol` - Foundry tests
   - `Deploy.s.sol` - Deployment script

2. **Frontend (`src/`)** - Next.js 14 App Router application
   - Server-side rendering with client components for Web3 interactions
   - Uses wagmi v2 hooks for blockchain interactions

### Key Integration Points

**Contract Address Configuration:**
- Contract address stored in `NEXT_PUBLIC_BETTING_CONTRACT_ADDRESS` env var
- Checked via `isContractDeployed()` in `src/lib/contract.ts`
- All pages gracefully handle undeployed contract state

**Web3 Provider Architecture:**
- `src/app/providers.tsx` wraps app with WagmiProvider + RainbowKit
- `src/lib/wagmi.ts` configures chains (Base Sepolia + Base Mainnet)
- Requires `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID` from WalletConnect Cloud

**Custom Hooks Pattern (`src/hooks/useBettingContract.ts`):**
- Read hooks use `useReadContract` (e.g., `useMarket`, `useMarketOdds`)
- Write hooks use `useWriteContract` + `useWaitForTransactionReceipt` pattern
- All hooks import ABI from `src/lib/contract.ts`

### Smart Contract Architecture

**BettingMarket.sol** - Single contract handling all markets:
- Markets stored in mapping with auto-incrementing `marketCounter`
- User bets stored in nested mapping: `mapping(marketId => mapping(address => Bet[]))`
- Platform fee: 2% (configurable, capped at 10%)
- Access control: Market creators can resolve their markets

**Key State Flow:**
1. Create Market → emits `MarketCreated` event
2. Place Bet → updates market totals, stores user bet
3. Market ends (time-based) → creator resolves with winning outcome
4. Users claim winnings → payout calculated based on pool ratio minus fees

### Frontend Routing Structure

**App Router pages:**
- `/` - Home page with navigation cards
- `/markets` - Lists all markets (reverse chronological)
- `/markets/[id]` - Individual market detail with betting interface
- `/create` - Create new market form
- `/my-bets` - User's betting history across all markets

**Key UI Patterns:**
- All pages check `isContractDeployed()` and show warning if false
- All pages check `isConnected` and prompt wallet connection
- Market cards show live odds percentages (calculated from pool totals)
- Time-based markets show countdown or "Ended" status

## Environment Setup

**Required Environment Variables:**

`.env.local` (frontend):
```
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=  # From cloud.walletconnect.com
NEXT_PUBLIC_BETTING_CONTRACT_ADDRESS=   # After contract deployment
NEXT_PUBLIC_CHAIN_ID=84532              # Base Sepolia (or 8453 for mainnet)
```

`contracts/.env` (for deployment):
```
PRIVATE_KEY=                            # Deployer wallet private key
BASESCAN_API_KEY=                       # For contract verification
```

## Development Workflow

### First Time Setup
1. Install dependencies: `npm install`
2. Install Foundry dependencies: `cd contracts && forge install foundry-rs/forge-std`
3. Get WalletConnect Project ID from https://cloud.walletconnect.com/
4. Update `.env.local` with Project ID
5. Start dev server: `npm run dev`

### Contract Development Workflow
1. Make changes to `contracts/src/BettingMarket.sol`
2. Write/update tests in `contracts/test/BettingMarket.t.sol`
3. Run tests: `forge test -vvv`
4. Deploy to Base Sepolia testnet
5. Update `NEXT_PUBLIC_BETTING_CONTRACT_ADDRESS` in `.env.local`
6. Restart Next.js dev server to pick up new address

### Frontend Development Workflow
1. If adding new contract functions: Update ABI in `src/lib/contract.ts`
2. Create hooks in `src/hooks/useBettingContract.ts` if needed
3. Build UI components that consume hooks
4. All contract interactions should be wrapped in try/catch with user feedback

## Important Implementation Details

**BigInt Handling:**
- All Ethereum values (amounts, timestamps) are `bigint` in TypeScript
- Use `parseEther(string)` to convert ETH strings to wei
- Use `formatEther(bigint)` to display values (wrapped in `formatEth` util)

**Market Outcomes:**
- Boolean values: `true` = YES, `false` = NO
- Consistently used across contracts, hooks, and UI

**Time Handling:**
- Smart contracts use Unix timestamps (seconds)
- JavaScript Date uses milliseconds - convert with `* 1000` or `/ 1000`
- Utility functions in `src/lib/utils.ts` handle conversions

**Transaction Flow:**
- Write hooks return `isPending` (wallet confirmation), `isConfirming` (on-chain), `isSuccess`
- Always disable buttons during `isPending || isConfirming`
- Show success messages on `isSuccess`
- Refetch data after successful transactions

## Testing Considerations

**Smart Contract Tests (Foundry):**
- Use `vm.prank(address)` to test as different users
- Use `vm.warp(timestamp)` to fast-forward time for market expiry tests
- Test patterns include: creation, betting, resolution, claiming
- Use `testFail*` prefix for expected failure cases

**Frontend Testing (Not yet implemented):**
- Will need to mock wagmi hooks for component tests
- Consider using wagmi's test utilities when implementing

## Security Notes

- Contract uses OpenZeppelin's security patterns (not yet imported in code)
- No reentrancy guards currently implemented - should be added before production
- Market resolution is centralized (creator controls outcome) - consider oracle integration
- Platform fee is configurable but capped at 10% in contract
- This is MVP code - requires professional audit before mainnet deployment
