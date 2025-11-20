'use client';

import { useState } from 'react';

export function DeploymentGuide() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 border-2 border-blue-200 dark:border-blue-800 rounded-xl p-6">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4 flex-1">
          <div className="text-4xl">🚀</div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
              Deploy Smart Contract to Get Started
            </h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
              The betting smart contract needs to be deployed to Base Sepolia before you can create markets and place bets.
            </p>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold text-sm"
            >
              {isExpanded ? '▼ Hide Instructions' : '▶ Show Deployment Instructions'}
            </button>
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="mt-6 space-y-6 pl-16">
          {/* Step 1 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                1
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Install Foundry
                </h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                  Foundry is the development framework for Solidity smart contracts.
                </p>
                <div className="bg-gray-900 dark:bg-black rounded p-3 overflow-x-auto">
                  <code className="text-green-400 text-sm font-mono">
                    curl -L https://foundry.paradigm.xyz | bash<br />
                    foundryup
                  </code>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                2
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Install Contract Dependencies
                </h4>
                <div className="bg-gray-900 dark:bg-black rounded p-3 overflow-x-auto">
                  <code className="text-green-400 text-sm font-mono">
                    cd contracts<br />
                    forge install foundry-rs/forge-std<br />
                    cd ..
                  </code>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                3
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Get Base Sepolia ETH
                </h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                  You&apos;ll need testnet ETH to deploy the contract.
                </p>
                <a
                  href="https://www.coinbase.com/faucets/base-ethereum-goerli-faucet"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-blue-600 dark:text-blue-400 hover:underline text-sm"
                >
                  Get Base Sepolia ETH from Faucet →
                </a>
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                4
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Set Up Environment Variables
                </h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                  Create a <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">contracts/.env</code> file:
                </p>
                <div className="bg-gray-900 dark:bg-black rounded p-3 overflow-x-auto">
                  <code className="text-green-400 text-sm font-mono">
                    PRIVATE_KEY=your_wallet_private_key<br />
                    BASESCAN_API_KEY=your_basescan_api_key
                  </code>
                </div>
                <p className="text-yellow-600 dark:text-yellow-400 text-xs mt-2">
                  ⚠️ Never commit your private key to git!
                </p>
              </div>
            </div>
          </div>

          {/* Step 5 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                5
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Deploy Contract
                </h4>
                <div className="bg-gray-900 dark:bg-black rounded p-3 overflow-x-auto">
                  <code className="text-green-400 text-sm font-mono">
                    cd contracts<br />
                    forge script script/Deploy.s.sol:DeployScript \<br />
                    &nbsp;&nbsp;--rpc-url https://sepolia.base.org \<br />
                    &nbsp;&nbsp;--broadcast --verify
                  </code>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
                  Copy the deployed contract address from the output.
                </p>
              </div>
            </div>
          </div>

          {/* Step 6 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                6
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Update Frontend Configuration
                </h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                  Add the contract address to your <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">.env.local</code>:
                </p>
                <div className="bg-gray-900 dark:bg-black rounded p-3 overflow-x-auto">
                  <code className="text-green-400 text-sm font-mono">
                    NEXT_PUBLIC_BETTING_CONTRACT_ADDRESS=0x...
                  </code>
                </div>
              </div>
            </div>
          </div>

          {/* Step 7 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                7
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Restart Development Server
                </h4>
                <div className="bg-gray-900 dark:bg-black rounded p-3 overflow-x-auto">
                  <code className="text-green-400 text-sm font-mono">
                    npm run dev
                  </code>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
                  Refresh this page and you&apos;re ready to go! 🎉
                </p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
            <p className="text-blue-800 dark:text-blue-200 text-sm">
              <strong>Need help?</strong> Check out the <a href="/README.md" className="underline">README.md</a> or <a href="/TECHNICAL_DOCUMENTATION.md" className="underline">TECHNICAL_DOCUMENTATION.md</a> for more details.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
