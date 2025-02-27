'use client';

import { toast as sonnerToast } from "sonner";

interface ToastOptions {
  title?: string;
  description?: string;
  variant?: 'default' | 'destructive';
  duration?: number;
}

export function useToast() {
  const showToast = ({ 
    title, 
    description, 
    variant = 'default',
    duration = 3000 
  }: ToastOptions) => {
    sonnerToast[variant === 'destructive' ? 'error' : 'success'](`${title}`, {
      description,
      duration,
    });
  };

  return { toast: showToast };
}