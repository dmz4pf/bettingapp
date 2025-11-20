# VibeCoding Betting App

A decentralized prediction market platform built on Base chain where users can create and participate in peer-to-peer betting markets.

## Features

- Create custom binary betting markets (YES/NO outcomes)
- Place bets with ETH on Base chain
- Real-time odds calculation
- Automated payout distribution
- Low fees (2% platform fee)
- Built on Base L2 for fast and cheap transactions

## Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **TailwindCSS** - Utility-first styling
- **wagmi v2** - React hooks for Ethereum
- **RainbowKit** - Wallet connection UI
- **viem** - TypeScript Ethereum library

### Smart Contracts
- **Solidity 0.8.20** - Smart contract language
- **Foundry** - Development framework and testing
- **OpenZeppelin** - Security standards

### Blockchain
- **Base Sepolia** - Testnet for development
- **Base Mainnet** - Production deployment

## Project Structure

```
vibecoding/
├── contracts/              # Smart contracts (Foundry)
│   ├── src/
│   │   └── BettingMarket.sol
│   ├── test/
│   │   └── BettingMarket.t.sol
│   ├── script/
│   │   └── Deploy.s.sol
│   └── foundry.toml
├── src/                    # Next.js frontend
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── providers.tsx
│   │   └── globals.css
│   ├── components/
│   ├── hooks/
│   ├── lib/
│   │   └── wagmi.ts
│   └── types/
│       └── index.ts
├── public/
├── TECHNICAL_DOCUMENTATION.md
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- [Foundry](https://book.getfoundry.sh/getting-started/installation) (for smart contracts)
- MetaMask or another Web3 wallet
- Base Sepolia ETH for testing

### Installation

1. **Clone the repository**
```bash
cd /Users/MAC/Desktop/dev/vibecoding
```

2. **Install frontend dependencies**
```bash
npm install
```

3. **Install Foundry dependencies**
```bash
cd contracts
forge install foundry-rs/forge-std
cd ..
```

4. **Set up environment variables**
```bash
cp .env.example .env.local
```

Edit `.env.local` and add:
- `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID` - Get from [WalletConnect Cloud](https://cloud.walletconnect.com/)

5. **Run the development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Smart Contract Development

### Compile contracts
```bash
cd contracts
forge build
```

### Run tests
```bash
cd contracts
forge test
forge test -vvv  # Verbose output
```

### Deploy to Base Sepolia

1. **Get Base Sepolia ETH**
   - Visit [Base Sepolia Faucet](https://www.coinbase.com/faucets/base-ethereum-goerli-faucet)

2. **Set up deployment variables**
Create `contracts/.env`:
```
PRIVATE_KEY=your_private_key_here
BASESCAN_API_KEY=your_basescan_api_key
```

3. **Deploy**
```bash
cd contracts
forge script script/Deploy.s.sol:DeployScript --rpc-url base_sepolia --broadcast --verify
```

4. **Update frontend config**
Copy the deployed contract address to `.env.local`:
```
NEXT_PUBLIC_BETTING_CONTRACT_ADDRESS=0x...
```

## Smart Contract Functions

### User Functions

**createMarket(description, endTime, minBet)**
- Create a new betting market
- Parameters:
  - `description`: Market description
  - `endTime`: Unix timestamp when betting closes
  - `minBet`: Minimum bet amount in wei

**placeBet(marketId, outcome)**
- Place a bet on a market
- Parameters:
  - `marketId`: Market ID to bet on
  - `outcome`: true for YES, false for NO
- Send ETH value with transaction

**claimWinnings(marketId)**
- Claim winnings from a resolved market
- Parameters:
  - `marketId`: Market ID to claim from

**resolveMarket(marketId, winningOutcome)**
- Resolve a market (creator or owner only)
- Parameters:
  - `marketId`: Market ID to resolve
  - `winningOutcome`: true for YES wins, false for NO wins

### View Functions

**getMarket(marketId)** - Get market details

**getOdds(marketId)** - Get current odds (YES%, NO%)

**getUserBets(marketId, user)** - Get user's bets for a market

**calculatePayout(marketId, betAmount, outcome)** - Calculate potential payout

## Development Roadmap

### Phase 1: MVP (Current)
- [x] Smart contract development
- [x] Basic frontend UI
- [x] Wallet connection
- [ ] Create markets functionality
- [ ] View markets functionality
- [ ] Place bets functionality
- [ ] Claim winnings functionality

### Phase 2: Enhancement
- [ ] Improved UI/UX
- [ ] Market categories
- [ ] Search & filtering
- [ ] User profiles & history
- [ ] Analytics dashboard

### Phase 3: Advanced Features
- [ ] Oracle integration
- [ ] Automated resolution
- [ ] Social features
- [ ] Market liquidity pools
- [ ] Mobile optimization

### Phase 4: Production
- [ ] Security audit
- [ ] Mainnet deployment
- [ ] Marketing & launch

## Testing

### Smart Contract Tests
```bash
cd contracts
forge test
```

### Frontend Tests (Coming soon)
```bash
npm test
```

## Security

- Uses OpenZeppelin contracts for security standards
- ReentrancyGuard protection on critical functions
- Pausable mechanism for emergencies
- Platform fee capped at 10%
- Only authorized users can resolve markets

**⚠️ Important:** This is an MVP. Do NOT use in production without a professional security audit.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Write/update tests
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

- Documentation: [TECHNICAL_DOCUMENTATION.md](./TECHNICAL_DOCUMENTATION.md)
- Issues: Open an issue on GitHub
- Discord: Coming soon
- Twitter: Coming soon

## Disclaimer

This is experimental software. Use at your own risk. Gambling laws vary by jurisdiction. Ensure compliance with local regulations before using or deploying this platform.

## Resources

- [Base Documentation](https://docs.base.org)
- [Foundry Book](https://book.getfoundry.sh)
- [wagmi Documentation](https://wagmi.sh)
- [RainbowKit Documentation](https://www.rainbowkit.com)
- [Next.js Documentation](https://nextjs.org/docs)

---

Built with ❤️ on Base Chain
