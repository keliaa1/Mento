"use client";

import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";

import { useSettings } from "@/Hooks/use-settings";
import { Label } from "@/components/ui/label";
import { ModeToggle } from "@/components/mode-toggle";

export default function SettingsModal() {
  const settings = useSettings();

  return (
    <Dialog open={settings.isOpen} onOpenChange={settings.onClose}>
      <DialogContent>
        <DialogHeader className="border-b pb-3">
          <h2>My settings</h2>
        </DialogHeader>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-1">
            <Label>Appearance</Label>

            <span className="text-[0.8rem] text-muted-foreground">Customise how mento looks on your device</span>
          </div>
          <ModeToggle />
        </div>
      </DialogContent>
    </Dialog>
  );
}
