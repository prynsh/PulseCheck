"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface Project {
  id: number;
  name: string;
  url: string;
  discordEnabled: boolean;
  discordUrl: string;
  ping: {
    id: number;
    status: string;
    createdAt: string;
    updatedAt: string;
  }[];
}

const Card = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("/api/project");
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`/api/project?id=${id}`);
      setProjects((prev) => prev.filter((proj) => proj.id !== id));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  return (
    <div className="p-4 w-6xl space-y-4">
      {projects.map((project) => (
        <div
          key={project.id}
          className="bg-[#a4a2de] text-black p-4 rounded-xl shadow-lg flex items-center justify-between space-x-4"
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
            <h2 className="text-lg font-semibold">{project.name}</h2>
            <span>-</span>
            <p className="text-sm text-black  hover:underline underline-offset-2 cursor-pointer ">{project.url}</p>
          </div>

          <div className="flex space-x-2">
            <Button>See Details</Button>
            <Button variant="destructive" onClick={() => handleDelete(project.id)}>
              Delete
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
