"use client";

import * as Toast from "@radix-ui/react-toast";
import { createContext, useCallback, useContext, useState } from "react";
import clsx from "clsx";
import {
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  Info,
  X,
} from "lucide-react";

type ToastType = "success" | "error" | "warning" | "info";

interface AppToast {
  id: number;
  title: string;
  message?: string;
  type?: ToastType;
}

interface ToastContextProps {
  pushToast: (toast: Omit<AppToast, "id">) => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

const iconMap = {
  success: CheckCircle2,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
};

const colorMap = {
  success: {
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    text: "text-emerald-600",
    icon: "text-emerald-500",
    dark: "dark:bg-emerald-500/20 dark:border-emerald-500/30 dark:text-emerald-400 dark:text-emerald-300",
  },
  error: {
    bg: "bg-red-500/10",
    border: "border-red-500/20",
    text: "text-red-600",
    icon: "text-red-500",
    dark: "dark:bg-red-500/20 dark:border-red-500/30 dark:text-red-400 dark:text-red-300",
  },
  warning: {
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    text: "text-amber-600",
    icon: "text-amber-500",
    dark: "dark:bg-amber-500/20 dark:border-amber-500/30 dark:text-amber-400 dark:text-amber-300",
  },
  info: {
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    text: "text-blue-600",
    icon: "text-blue-500",
    dark: "dark:bg-blue-500/20 dark:border-blue-500/30 dark:text-blue-400 dark:text-blue-300",
  },
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<AppToast[]>([]);

  const pushToast = useCallback((toast: Omit<AppToast, "id">) => {
    setToasts((prev) => [...prev, { ...toast, id: Date.now() }]);
  }, []);

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ pushToast }}>
      <Toast.Provider duration={2000}>
        {children}

        <div className="fixed bottom-4 right-4 flex flex-col gap-2 z-50 pointer-events-none">
          {toasts.map((t) => {
            const Icon = iconMap[t.type || "info"];
            const colors = colorMap[t.type || "info"];

            return (
              <Toast.Root
                key={t.id}
                open={true}
                onOpenChange={(open) => !open && removeToast(t.id)}
                className={clsx(
                  "pointer-events-auto animate-in slide-in-from-right-4 fade-in duration-300",
                  "rounded-xl border backdrop-blur-md",
                  "px-6 py-3 shadow-xl",
                  "transition-all hover:shadow-2xl",
                  colors.bg,
                  colors.border,
                  colors.dark
                )}
              >
                <div className="flex items-start gap-3">
                  <Icon
                    className={clsx(
                      "h-5 w-5 shrink-0 mt-0.5",
                      colors.icon,
                      colors.dark
                    )}
                  />

                  <div className="flex-1 min-w-0">
                    <Toast.Title
                      className={clsx(
                        "font-semibold text-sm",
                        colors.text,
                        colors.dark
                      )}
                    >
                      {t.title}
                    </Toast.Title>
                    {t.message && (
                      <Toast.Description
                        className={clsx(
                          "text-xs mt-1 opacity-75",
                          colors.text,
                          colors.dark
                        )}
                      >
                        {t.message}
                      </Toast.Description>
                    )}
                  </div>

                  <button
                    onClick={() => removeToast(t.id)}
                    className={clsx(
                      "shrink-0 rounded-md p-1 transition-colors",
                      "hover:bg-black/5 dark:hover:bg-white/10",
                      colors.text,
                      colors.dark
                    )}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </Toast.Root>
            );
          })}
        </div>

        <Toast.Viewport className="fixed top-2 right-3 z-50" />
      </Toast.Provider>
    </ToastContext.Provider>
  );
}

export function useAppToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useAppToast must be used within <ToastProvider>");
  return ctx;
}
