"use client";

import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import Modal from "../component/Modal";
import axios from "axios";
import { useSession } from "next-auth/react";
import Card from "../component/ProjectCard";
import { Project } from "@/constants/types";
import { motion, AnimatePresence } from "framer-motion";
import Loader from "../component/Loader";
import { useRouter } from "next/navigation";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [servers, setServers] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect if unauthenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/api/auth/signin");
    }
  }, [status, router]);

  const fetchServers = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/project");
      setServers(res.data);
    } catch (error) {
      console.error("Failed to fetch servers:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      fetchServers();
    }
  }, [status]);

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

  // Show loader while session is being loaded
  if (status === "loading") {
    return (
      <div className=" h-screen flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="h-screen flex justify-center text-center items-center text-[#9a8556]">
      <div className="flex flex-col items-center text-center space-y-4">
        <p>Start Pinging your Servers Today</p>
        <Button onClick={() => setIsModalOpen(true)}>Add a Server</Button>

        {loading ? (
          <Loader />
        ) : (
          <motion.div
            className="mt-4 space-y-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <AnimatePresence>
              {servers.map((server) => (
                <Card key={server.id} project={server} onDelete={handleDelete} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      <Modal open={isModalOpen} onOpenChange={setIsModalOpen} onSave={handleSave} />
    </div>
  );
}
