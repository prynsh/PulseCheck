"use client";

import { Button } from "@/components/ui/button";
import { Project } from "@/constants/types";
import React from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


interface CardProps {
  project: Project;
  onDelete: (id: number) => void;
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const Card = ({ project, onDelete }: CardProps) => {
  const router = useRouter()
  const handleDelete = () => {
    onDelete(project.id); 
    toast.success(`${project.name} has been deleted.`);
  };
   const handleSeeDetails = () => {
    router.push(`/project/${project.id}`); // ← navigate to project details
  };
  return (
    <motion.div
  className="bg-[#b49758] p-4 rounded-xl shadow-lg flex flex-col md:flex-row md:items-center md:justify-between gap-4"
  variants={cardVariants}
  initial="hidden"
  animate="visible"
  exit="hidden"
  layout
>
  {/* Name, Ping, URL */}
  <div className="flex items-center space-x-2">
    {project.ping.length > 0 && (
      <div
        className={`h-3 w-3 rounded-full animate-pulse ${
          project.ping[0].status.startsWith("200")
            ? "bg-green-500 shadow-[0_0_10px_2px_rgba(34,197,94,0.7)]"
            : "bg-red-500 shadow-[0_0_10px_2px_rgba(239,68,68,0.7)]"
        }`}
      />
    )}
    <h2 className="text-lg text-black font-semibold">{project.name}</h2>
    <span>-</span>
    <p className="text-sm text-black hover:underline underline-offset-2 cursor-pointer">
      {project.url}
    </p>
  </div>

  {/* Buttons (Below on small, beside on md+) */}
  <div className="flex gap-2">
    <Button onClick={handleSeeDetails}>See Details</Button>
    <Button variant="destructive" onClick={handleDelete}>
      Delete
    </Button>
  </div>
</motion.div>

  );
};

export default Card;
