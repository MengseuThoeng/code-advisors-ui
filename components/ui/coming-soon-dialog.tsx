"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Rocket, Sparkles } from "lucide-react";

interface ComingSoonDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  feature?: string;
}

export function ComingSoonDialog({ open, onOpenChange, feature = "This feature" }: ComingSoonDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary">
            <Rocket className="h-10 w-10 text-white" />
          </div>
          <DialogTitle className="text-center text-2xl font-bold">
            Coming Soon! 🚀
          </DialogTitle>
          <DialogDescription asChild>
            <div className="text-center text-base pt-2">
              <span className="flex items-center justify-center gap-2 mb-3">
                <Sparkles className="h-4 w-4 text-amber-500" />
                <span className="font-semibold text-gray-900">{feature}</span>
                <Sparkles className="h-4 w-4 text-amber-500" />
              </span>
              <span className="text-gray-600 block">
                We&apos;re working hard to bring you this amazing feature. Stay tuned for updates in <span className="font-semibold text-primary">2026</span>!
              </span>
            </div>
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 rounded-lg bg-gradient-to-r from-primary/10 to-secondary/10 p-4 text-center">
          <p className="text-sm text-gray-700">
            Thank you for your patience and support! 💙
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
