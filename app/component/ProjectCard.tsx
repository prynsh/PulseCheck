"use client";

import { Button } from "@/components/ui/button";
import { Project } from "@/constants/types";
import React from "react";



interface CardProps {
  project: Project;
  onDelete: (id: number) => void;
}

const Card = ({ project, onDelete }: CardProps) => {
  return (
    <div
      className="bg-[#b49758] w-4xl hover: text-black p-4 rounded-xl shadow-lg flex items-center justify-between space-x-4"
    >
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
        <h2 className="text-lg text- font-semibold">{project.name}</h2>
        <span>-</span>
        <p className="text-sm text-black hover:underline underline-offset-2 cursor-pointer">
          {project.url}
        </p>
      </div>

      <div className="flex space-x-2">
        <Button>See Details</Button>
        <Button variant="destructive" onClick={() => onDelete(project.id)}>
          Delete
        </Button>
      </div>
    </div>
  );
};

export default Card;
