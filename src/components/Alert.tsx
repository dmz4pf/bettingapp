import { ReactNode } from 'react';

type AlertVariant = 'info' | 'success' | 'warning' | 'error';

interface AlertProps {
  variant: AlertVariant;
  title?: string;
  children: ReactNode;
  onClose?: () => void;
}

const variantStyles: Record<AlertVariant, string> = {
  info: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200',
  success: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200',
  warning: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800 text-yellow-800 dark:text-yellow-200',
  error: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200',
};

const variantIcons: Record<AlertVariant, string> = {
  info: 'ℹ️',
  success: '✓',
  warning: '⚠️',
  error: '✕',
};

export function Alert({ variant, title, children, onClose }: AlertProps) {
  return (
    <div className={`rounded-lg border-2 p-4 ${variantStyles[variant]}`}>
      <div className="flex items-start gap-3">
        <div className="text-2xl">{variantIcons[variant]}</div>
        <div className="flex-1">
          {title && (
            <h3 className="font-semibold mb-1">{title}</h3>
          )}
          <div className="text-sm">{children}</div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}

export function ContractNotDeployed() {
  return (
    <Alert variant="warning" title="Smart Contract Not Deployed">
      <p className="mb-3">
        The betting smart contract hasn&apos;t been deployed yet. To use the full functionality, you need to:
      </p>
      <ol className="list-decimal list-inside space-y-1">
        <li>Install Foundry (see README.md)</li>
        <li>Deploy the contract to Base Sepolia testnet</li>
        <li>Update NEXT_PUBLIC_BETTING_CONTRACT_ADDRESS in .env.local</li>
        <li>Restart the development server</li>
      </ol>
    </Alert>
  );
}

export function ConnectWalletPrompt() {
  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-12 text-center">
      <div className="text-6xl mb-4">🔗</div>
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
        Connect Your Wallet
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Please connect your wallet to access this feature
      </p>
    </div>
  );
}
