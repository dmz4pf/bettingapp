import Link from 'next/link';
import { ReactNode } from 'react';

interface EmptyStateProps {
  icon: string;
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
  children?: ReactNode;
}

export function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  actionHref,
  children,
}: EmptyStateProps) {
  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-12 text-center">
      <div className="text-6xl mb-4">{icon}</div>
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
        {title}
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">{description}</p>
      {actionLabel && actionHref && (
        <Link
          href={actionHref}
          className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-8 rounded-lg transition-all"
        >
          {actionLabel}
        </Link>
      )}
      {children}
    </div>
  );
}

export function NoMarketsFound() {
  return (
    <EmptyState
      icon="📊"
      title="No Markets Yet"
      description="Be the first to create a prediction market!"
      actionLabel="Create First Market"
      actionHref="/create"
    />
  );
}

export function NoBetsFound() {
  return (
    <EmptyState
      icon="📈"
      title="No Bets Yet"
      description="You haven't placed any bets yet. Browse markets to get started!"
      actionLabel="Browse Markets"
      actionHref="/markets"
    />
  );
}

export function MarketNotFound() {
  return (
    <EmptyState
      icon="❓"
      title="Market Not Found"
      description="This market doesn't exist or has been removed."
      actionLabel="Back to Markets"
      actionHref="/markets"
    />
  );
}
