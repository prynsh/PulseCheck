import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Form from "./Form";
import { toast } from "sonner";
import { AlertTriangle } from "lucide-react";

interface WebsiteModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (data: {
    name: string;
    url: string;
    discordEnabled: boolean;
    discordUrl: string;
  }) => void;
}

const Modal: React.FC<WebsiteModalProps> = ({ open, onOpenChange, onSave }) => {
  const handleSave = (data: {
    name: string;
    url: string;
    discordEnabled: boolean;
    discordUrl: string;
  }) => {
    onSave(data);
    toast.success(`Website saved successfully! We'll start monitoring it soon`);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-[#f3da72]">
        <DialogHeader>
          <DialogTitle className="text-xl">Add your servers</DialogTitle>
        </DialogHeader>
        <div className=" items-start gap-2 p-2  text-white bg-[#021e2b] border border-black rounded-md text-sm">
          <AlertTriangle className="mt-0.5 h-6 w-6" />
          <p>
            By default, we will send an email notification if this server returns any status code other than 200.
          </p>
          
        </div>
        <Form
          onSubmit={handleSave}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
