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

'use client'

import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import Modal from '../component/Modal';

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSave = (data: {
    name: string;
    url: string;
    discordEnabled: boolean;
    discordUrl: string;
  }) => {
    console.log('Saved website data:', data);
    // Optionally: send to API or update state
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center text-white">
      <div className="flex flex-col items-center text-center space-y-4">
        <p>Start Pinging your Servers Today</p>
        <Button onClick={() => setIsModalOpen(true)}>Add a Server</Button>
      </div>

      <Modal open={isModalOpen} onOpenChange={setIsModalOpen} onSave={handleSave} />
    </div>
  );
}
