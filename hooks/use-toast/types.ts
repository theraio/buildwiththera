import type { ReactNode } from "react";

export interface ToastAction {
  label: ReactNode;
  onClick: () => void;
}

export interface ToastOptions {
  description?: ReactNode;
  duration?: number;
  id?: string | number;
  action?: ToastAction;
  cancel?: ToastAction;
}

export interface UseToastReturn {
  toast: (message: ReactNode, options?: ToastOptions) => string | number;
  success: (message: ReactNode, options?: ToastOptions) => string | number;
  error: (message: ReactNode, options?: ToastOptions) => string | number;
  warning: (message: ReactNode, options?: ToastOptions) => string | number;
  info: (message: ReactNode, options?: ToastOptions) => string | number;
  loading: (message: ReactNode, options?: ToastOptions) => string | number;
  dismiss: (id?: string | number) => void;
}
