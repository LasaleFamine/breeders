import React from 'react';

// We need a classi ErrorBoundary to cach error from Suspense
// More info: https://swr.vercel.app/docs/suspense
export class ErrorBoundary extends React.Component<{ fallback?: React.ReactNode }> {
  state = { hasError: false };
  static getDerivedStateFromError(error: any) {
    return {
      hasError: true,
      error,
    };
  }

  render() {
    const { hasError } = this.state;
    const { fallback, children } = this.props;

    if (hasError) {
      return fallback;
    }

    return children;
  }
}
