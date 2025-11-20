import { LoadingSpinner } from './LoadingSpinner';

interface TransactionStatusProps {
  isPending?: boolean;
  isConfirming?: boolean;
  isSuccess?: boolean;
  error?: Error | null;
  hash?: string;
  successMessage?: string;
}

export function TransactionStatus({
  isPending,
  isConfirming,
  isSuccess,
  error,
  hash,
  successMessage = 'Transaction successful!',
}: TransactionStatusProps) {
  if (!isPending && !isConfirming && !isSuccess && !error) {
    return null;
  }

  return (
    <div className="space-y-3">
      {(isPending || isConfirming) && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <LoadingSpinner size="sm" />
            <div>
              <p className="text-blue-800 dark:text-blue-200 font-semibold text-sm">
                {isPending ? 'Confirm in wallet...' : 'Processing transaction...'}
              </p>
              {hash && (
                <a
                  href={`https://sepolia.basescan.org/tx/${hash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 text-xs hover:underline"
                >
                  View on BaseScan →
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {isSuccess && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <span className="text-green-600 text-xl">✓</span>
            <div>
              <p className="text-green-800 dark:text-green-200 font-semibold text-sm">
                {successMessage}
              </p>
              {hash && (
                <a
                  href={`https://sepolia.basescan.org/tx/${hash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 dark:text-green-400 text-xs hover:underline"
                >
                  View on BaseScan →
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <span className="text-red-600 text-xl">✕</span>
            <div>
              <p className="text-red-800 dark:text-red-200 font-semibold text-sm mb-1">
                Transaction Failed
              </p>
              <p className="text-red-700 dark:text-red-300 text-xs">
                {error.message.length > 100 ? error.message.slice(0, 100) + '...' : error.message}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
