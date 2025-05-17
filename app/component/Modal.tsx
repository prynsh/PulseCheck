// import React from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { PlusCircle } from "lucide-react";
// import Form from "./Form";

// interface WebsiteModalProps {
//   onSave: (data: {
//     name: string;
//     url: string;
//     discordEnabled: boolean;
//     discordUrl: string;
//   }) => void;
// }

// const Modal: React.FC<WebsiteModalProps> = ({ onSave }) => {
//   const [open, setOpen] = React.useState(false);

//   const handleSave = (data: {
//     name: string;
//     url: string;
//     discordEnabled: boolean;
//     discordUrl: string;
//   }) => {
//     onSave(data);
//     setOpen(false);
//   };

//   return (
//     <Dialog open={open} onOpenChange={setOpen}>
//       <DialogTrigger asChild>
//         <Button className="gap-2 group">
//           <PlusCircle className="w-4 h-4 transition-transform group-hover:scale-110" />
//           <span>Add Website</span>
//         </Button>
//       </DialogTrigger>
//       <DialogContent className="sm:max-w-[425px]">
//         <DialogHeader>
//           <DialogTitle className="text-xl">Add New Website</DialogTitle>
//         </DialogHeader>
//         <Form
//           onSubmit={handleSave}
//           onCancel={() => setOpen(false)}
//         />
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default Modal;

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Form from "./Form";

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
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-[#f3da72]">
        <DialogHeader>
          <DialogTitle className="text-xl">Add your servers</DialogTitle>
        </DialogHeader>
        <Form
          onSubmit={handleSave}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
