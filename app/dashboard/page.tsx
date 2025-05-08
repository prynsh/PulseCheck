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

'use client';

import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import Modal from '../component/Modal';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Card from '../component/Card';

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: session } = useSession();

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

      setIsModalOpen(false); // Optional: close modal after save
    } catch (error) {
      console.error("Failed to save server:", error);
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center text-white">
      <div className="flex flex-col items-center text-center space-y-4">
        <p>Start Pinging your Servers Today</p>
        <Button onClick={() => setIsModalOpen(true)}>Add a Server</Button>
        <Card/>
      </div>
      <Modal open={isModalOpen} onOpenChange={setIsModalOpen} onSave={handleSave} />
    </div>
  );
}
