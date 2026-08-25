"use client";
import { Toaster as SonnerToaster } from "sonner";

/**
 * Sonner toaster, configured exactly as the React `LandingPage` configured it.
 * Lives in the root layout so form toasts work on every route.
 */
export function Toaster() {
  return (
    <SonnerToaster
      position="bottom-right"
      richColors
      closeButton
      toastOptions={{
        className: "rounded-xl border-border shadow-lg font-sans",
      }}
    />
  );
}
