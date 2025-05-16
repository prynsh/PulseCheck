// import { Button } from '@/components/ui/button';
// import React from 'react';

// export default function Dashboard() {
//   return (
//     <div className="w-screen h-screen flex justify-center items-center text-white">
//       <div className="flex flex-col items-center text-center space-y-4">
//         <p>Start Pinging your Servers Today</p>
//         <Button>Add a Server</Button>
//       </div>
//     </div>
//   );
// }

"use client";

import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import Modal from "../component/Modal";
import axios from "axios";
import { useSession } from "next-auth/react";
import Card from "../component/Card";
import { Project } from "@/constants/types";


export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [servers, setServers] = useState<Project[]>([]);
  const { data: session } = useSession();

  const fetchServers = async () => {
    try {
      const res = await axios.get("/api/project");
      setServers(res.data);
    } catch (error) {
      console.error("Failed to fetch servers:", error);
    }
  };
  
  useEffect(() => {
    fetchServers();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`/api/project?id=${id}`);
      setServers((prev) => prev.filter((proj) => proj.id !== id));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const handleSave = async (data: {
    name: string;
    url: string;
    discordEnabled: boolean;
    discordUrl: string;
  }) => {
    if (!session?.user?.email) return;

    try {
      await axios.post("/api/project", {
        name: data.name,
        url: data.url,
        discordEnabled: data.discordEnabled,
        discordUrl: data.discordUrl,
      });

      setIsModalOpen(false);
      await fetchServers(); 
    } catch (error) {
      console.error("Failed to save server:", error);
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center text-[#9a8556]">
      <div className="flex flex-col items-center text-center space-y-4">
        <p>Start Pinging your Servers Today</p>
        <Button onClick={() => setIsModalOpen(true)}>Add a Server</Button>
        <div className="mt-4 space-y-2">
        {servers.map((server) => (
  <Card key={server.id} project={server} onDelete={handleDelete} />
))}
        </div>
      </div>
      <Modal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onSave={handleSave}
      />
    </div>
  );
}
