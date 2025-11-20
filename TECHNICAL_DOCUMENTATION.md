# Base Chain Betting App - Technical Documentation

## Project Overview

A decentralized betting application built on Base chain (Layer 2 Ethereum) that allows users to create and participate in peer-to-peer betting markets.

## Architecture

### Technology Stack

**Frontend:**
- Next.js 14 (App Router)
- TypeScript
- TailwindCSS
- wagmi v2 (React Hooks for Ethereum)
- viem (Ethereum interactions)
- RainbowKit (Wallet connection)
- Base chain RPC endpoints

**Smart Contracts:**
- Solidity ^0.8.20
- Foundry (Development framework)
- OpenZeppelin Contracts (Security & standards)

**Infrastructure:**
- Base Mainnet (Production)
- Base Sepolia (Testing)
- IPFS (Metadata storage)

## Core Features

### 1. Betting Markets
- **Create Market**: Users can create binary betting markets with custom conditions
- **Place Bets**: Users can bet on either outcome (YES/NO)
- **Market Resolution**: Oracle-based or community-driven resolution
- **Claim Winnings**: Automated distribution of winnings to winners

### 2. Market Types
- **Binary Markets**: Simple YES/NO outcomes
- **Time-based**: Markets with specific end dates
- **Event-based**: Markets tied to real-world events

### 3. User Features
- Connect wallet (MetaMask, Coinbase Wallet, WalletConnect)
- View active markets
- View betting history
- Track winnings/losses
- Real-time odds calculation

## Smart Contract Architecture

### BettingMarket.sol
Main contract handling betting logic

**Key Functions:**
```solidity
- createMarket(string description, uint256 endTime, uint256 minBet)
- placeBet(uint256 marketId, bool outcome, uint256 amount)
- resolveMarket(uint256 marketId, bool winningOutcome)
- claimWinnings(uint256 marketId)
- getMarketDetails(uint256 marketId)
- getOdds(uint256 marketId)
```

**State Variables:**
- Market struct (id, creator, description, totalYes, totalNo, resolved, etc.)
- User bets mapping
- Market counter
- Platform fee percentage

### MarketFactory.sol (Optional)
Factory pattern for creating individual market contracts

### Oracle.sol (Future)
Decentralized oracle for automated market resolution

## Data Models

### Market
```typescript
{
  id: number
  creator: address
  description: string
  endTime: timestamp
  totalYesBets: BigInt
  totalNoBets: BigInt
  minBet: BigInt
  resolved: boolean
  winningOutcome: boolean | null
  createdAt: timestamp
}
```

### Bet
```typescript
{
  marketId: number
  bettor: address
  outcome: boolean (true = YES, false = NO)
  amount: BigInt
  timestamp: timestamp
  claimed: boolean
}
```

## Security Considerations

1. **Reentrancy Protection**: Use OpenZeppelin's ReentrancyGuard
2. **Access Control**: Only authorized resolvers can resolve markets
3. **Time Locks**: Markets can only be resolved after endTime
4. **Overflow Protection**: Use Solidity 0.8+ built-in checks
5. **Emergency Pause**: Implement pause mechanism for emergencies
6. **Audit**: Smart contracts should be audited before mainnet deployment

## Economic Model

### Fee Structure
- Platform fee: 2-5% of total market pool
- Creator fee: Optional 0-2% set by market creator
- Gas optimization: Batch operations where possible

### Payout Calculation
```
Payout = (BetAmount / TotalWinningBets) * TotalPool * (1 - Fees)
```

## Development Phases

### Phase 1: MVP (Weeks 1-2)
- [ ] Smart contract development
- [ ] Basic frontend UI
- [ ] Wallet connection
- [ ] Create & view markets
- [ ] Place bets
- [ ] Manual market resolution

### Phase 2: Enhancement (Weeks 3-4)
- [ ] Improved UI/UX
- [ ] Market categories
- [ ] Search & filtering
- [ ] User profiles
- [ ] Betting history
- [ ] Analytics dashboard

### Phase 3: Advanced Features (Weeks 5-6)
- [ ] Oracle integration
- [ ] Automated resolution
- [ ] Social features (comments, sharing)
- [ ] Market liquidity pools
- [ ] Advanced market types

### Phase 4: Production (Weeks 7-8)
- [ ] Security audit
- [ ] Testnet deployment & testing
- [ ] Mainnet deployment
- [ ] Marketing & launch

## Testing Strategy

### Smart Contracts
- Unit tests (Foundry)
- Integration tests
- Fuzzing tests
- Gas optimization tests
- Testnet deployment tests

### Frontend
- Component testing (Jest/Vitest)
- E2E testing (Playwright)
- Wallet interaction testing
- Mobile responsiveness

## Deployment

### Testnet (Base Sepolia)
1. Deploy contracts to Base Sepolia
2. Verify contracts on BaseScan
3. Configure frontend with testnet addresses
4. Conduct user testing

### Mainnet (Base)
1. Final audit review
2. Deploy to Base mainnet
3. Verify contracts
4. Update frontend configuration
5. Monitor initial transactions

## API Endpoints (Future)

### REST API (Optional backend)
- `GET /api/markets` - List all markets
- `GET /api/markets/:id` - Get market details
- `GET /api/user/:address/bets` - Get user's betting history
- `GET /api/stats` - Platform statistics

## Environment Variables

```env
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=
NEXT_PUBLIC_BASE_RPC_URL=
NEXT_PUBLIC_BASE_SEPOLIA_RPC_URL=
NEXT_PUBLIC_BETTING_CONTRACT_ADDRESS=
NEXT_PUBLIC_CHAIN_ID=8453
PRIVATE_KEY= (for deployment)
BASESCAN_API_KEY= (for verification)
```

## File Structure

```
vibecoding/
├── contracts/              # Smart contracts
│   ├── src/
│   │   ├── BettingMarket.sol
│   │   └── interfaces/
│   ├── test/
│   ├── script/
│   └── foundry.toml
├── src/                    # Next.js frontend
│   ├── app/
│   ├── components/
│   ├── hooks/
│   ├── lib/
│   └── types/
├── public/
├── TECHNICAL_DOCUMENTATION.md
└── README.md
```

## Risk Factors

1. **Smart Contract Bugs**: Potential loss of user funds
2. **Oracle Manipulation**: Incorrect market resolution
3. **Front-running**: MEV attacks on bets
4. **Regulatory**: Gambling regulations vary by jurisdiction
5. **Market Manipulation**: Large bets influencing outcomes

## Compliance & Legal

- **Disclaimer**: Add clear terms of service
- **Age Verification**: Implement age checks
- **Geo-blocking**: Block restricted jurisdictions
- **KYC/AML**: Consider requirements based on jurisdiction
- **Legal Review**: Consult legal team before launch

## Success Metrics

- Total Value Locked (TVL)
- Number of active markets
- Number of unique users
- Transaction volume
- User retention rate
- Average bet size

## Future Enhancements

1. **Multi-outcome markets**: Beyond binary YES/NO
2. **NFT integration**: Betting receipts as NFTs
3. **Social features**: Follow bettors, leaderboards
4. **Mobile app**: Native iOS/Android apps
5. **Cross-chain**: Expand to other L2s
6. **DAO governance**: Community-driven platform decisions

## Resources

- Base Chain Docs: https://docs.base.org
- Foundry Book: https://book.getfoundry.sh
- wagmi Docs: https://wagmi.sh
- RainbowKit: https://www.rainbowkit.com
- OpenZeppelin: https://docs.openzeppelin.com

## Contact & Support

- Documentation: [Coming soon]
- Discord: [Coming soon]
- Twitter: [Coming soon]
- Email: [Coming soon]

---

**Version**: 1.0.0
**Last Updated**: November 2025
**Status**: Planning Phase
