"use client";

import type { ReactNode } from "react";
import { toast as sonnerToast } from "sonner";
import { ToastOptions, UseToastReturn } from "./types";

/**
 * The only file allowed to import `sonner` directly (besides the
 * `Toaster` component it renders through). Swapping the toast library
 * means updating this hook and `components/ui/sonner` only — every
 * other call site goes through `useToast()`.
 */
function useToast(): UseToastReturn {
  function toast(message: ReactNode, options?: ToastOptions) {
    return sonnerToast(message, options);
  }

  function success(message: ReactNode, options?: ToastOptions) {
    return sonnerToast.success(message, options);
  }

  function error(message: ReactNode, options?: ToastOptions) {
    return sonnerToast.error(message, options);
  }

  function warning(message: ReactNode, options?: ToastOptions) {
    return sonnerToast.warning(message, options);
  }

  function info(message: ReactNode, options?: ToastOptions) {
    return sonnerToast.info(message, options);
  }

  function loading(message: ReactNode, options?: ToastOptions) {
    return sonnerToast.loading(message, options);
  }

  function dismiss(id?: string | number) {
    sonnerToast.dismiss(id);
  }

  return { toast, success, error, warning, info, loading, dismiss };
}

export default useToast;
