import React, { Component, ErrorInfo, ReactNode } from 'react';
import { logger } from '../utils/logger';
import {
  ErrorContainer,
  ErrorIcon,
  ErrorTitle,
  ErrorMessage,
  ErrorDetails,
  ResetButton,
} from './ErrorBoundary.styles';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

/**
 * Error Boundary component to catch and handle React errors
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    logger.error('ErrorBoundary caught an error', {
      error: error.toString(),
      componentStack: errorInfo.componentStack,
    });

    this.setState({
      error,
      errorInfo,
    });

    // Call custom error handler if provided
    this.props.onError?.(error, errorInfo);
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <ErrorContainer>
          <ErrorIcon>⚠️</ErrorIcon>
          <ErrorTitle>Algo deu errado</ErrorTitle>
          <ErrorMessage>
            {this.state.error?.message || 'Ocorreu um erro inesperado'}
          </ErrorMessage>
          
          {process.env.NODE_ENV === 'development' && this.state.errorInfo && (
            <ErrorDetails>
              <summary>Detalhes do erro (apenas em desenvolvimento)</summary>
              <pre>{this.state.errorInfo.componentStack}</pre>
            </ErrorDetails>
          )}

          <ResetButton onClick={this.handleReset}>
            🔄 Tentar Novamente
          </ResetButton>
        </ErrorContainer>
      );
    }

    return this.props.children;
  }
}
