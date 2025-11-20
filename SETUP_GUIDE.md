# Quick Setup Guide

## Current Status ✅

Your betting app is running at: **http://localhost:3000**

## Next Steps

### 1. Get WalletConnect Project ID (Required for wallet connections)

**Why?** WalletConnect powers wallet connections in your app.

**Steps:**
1. Visit https://cloud.walletconnect.com/
2. Sign in with GitHub or email (free)
3. Click "Create New Project"
4. Name it "VibeCoding Betting" or anything you like
5. Copy the **Project ID** (looks like: `a1b2c3d4e5f6...`)

**Update `.env.local`:**
```bash
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=paste_your_real_project_id_here
```

**Restart dev server:**
```bash
# Kill current server (Ctrl+C) then:
npm run dev
```

### 2. Get Base Sepolia ETH (For testing)

**Why?** You need test ETH to deploy contracts and test betting.

**Steps:**
1. Install MetaMask if you haven't
2. Add Base Sepolia network to MetaMask
3. Visit https://www.coinbase.com/faucets/base-ethereum-goerli-faucet
4. Get free test ETH

### 3. Deploy Smart Contract (When ready to test)

**Install Foundry:**
```bash
curl -L https://foundry.paradigm.xyz | bash
foundryup
```

**Install dependencies:**
```bash
cd contracts
forge install foundry-rs/forge-std
```

**Run tests:**
```bash
forge test -vvv
```

**Deploy to Base Sepolia:**
```bash
# Create contracts/.env and add your private key:
# PRIVATE_KEY=your_private_key_from_metamask
# BASESCAN_API_KEY=get_from_basescan.org

forge script script/Deploy.s.sol:DeployScript \
  --rpc-url https://sepolia.base.org \
  --broadcast \
  --verify
```

**Update frontend with contract address:**

After deployment, update `.env.local`:
```bash
NEXT_PUBLIC_BETTING_CONTRACT_ADDRESS=0x...deployed_address...
```

### 4. Current Features

- ✅ Wallet connection UI
- ✅ Base chain integration
- ✅ Responsive design
- ✅ Smart contract (not deployed yet)
- ⏳ Need to implement: Market creation UI
- ⏳ Need to implement: Betting UI
- ⏳ Need to implement: Claims UI

### 5. Development Workflow

**Start dev server:**
```bash
npm run dev
```

**Run smart contract tests:**
```bash
cd contracts
forge test
```

**Build for production:**
```bash
npm run build
npm start
```

## Troubleshooting

### "No projectId found" error
→ Get a real WalletConnect Project ID (see Step 1)

### "@react-native-async-storage" warning
→ Ignore it, it's harmless

### Page won't load
→ Make sure you have Node.js 18+ installed
→ Delete `node_modules` and `.next` then run `npm install` again

### Wallet won't connect
→ Make sure you have a real WalletConnect Project ID
→ Make sure you're on Base Sepolia network in your wallet

## File Structure

```
vibecoding/
├── contracts/           # Solidity smart contracts
├── src/
│   ├── app/            # Next.js pages
│   ├── components/     # React components (add your UI here)
│   ├── lib/            # Web3 config
│   └── types/          # TypeScript types
├── .env.local          # Environment variables (update this!)
└── README.md           # Full documentation
```

## What to Build Next

1. **Market Creation Component** - Form to create new markets
2. **Market List Component** - Display all active markets
3. **Betting Component** - UI to place bets
4. **User Dashboard** - Show user's bets and winnings
5. **Market Resolution** - UI for market creators to resolve outcomes

Check `TECHNICAL_DOCUMENTATION.md` for the full roadmap!

## Resources

- [Base Docs](https://docs.base.org)
- [wagmi Docs](https://wagmi.sh)
- [RainbowKit Docs](https://www.rainbowkit.com)
- [Foundry Book](https://book.getfoundry.sh)

---

Need help? Check the full README.md or TECHNICAL_DOCUMENTATION.md
