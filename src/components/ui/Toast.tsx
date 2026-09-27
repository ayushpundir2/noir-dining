"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useToast } from "@/context/ToastContext";
import { CheckCircle2, Sparkles, Info, X } from "lucide-react";

export function ToastContainer() {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-md w-full pointer-events-none px-4">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="pointer-events-auto bg-[#18181d] border border-gold-500/30 rounded-xl p-4 shadow-2xl shadow-black/80 flex items-start gap-3 backdrop-blur-md"
          >
            <div className="mt-0.5 text-gold-400 shrink-0">
              {toast.type === "success" ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              ) : toast.type === "info" ? (
                <Info className="w-5 h-5 text-sky-400" />
              ) : (
                <Sparkles className="w-5 h-5 text-gold-400" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-cream-100">{toast.message}</p>
              {toast.description && (
                <p className="text-xs text-cream-400 mt-0.5 leading-relaxed">{toast.description}</p>
              )}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-cream-400 hover:text-cream-100 transition-colors p-1"
              aria-label="Dismiss notification"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
