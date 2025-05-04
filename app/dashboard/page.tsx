import { Button } from '@/components/ui/button';
import React from 'react';

export default function Dashboard() {
  return (
    <div className="w-screen h-screen flex justify-center items-center text-white">
      <div className="flex flex-col items-center text-center space-y-4">
        <p>Start Pinging your Servers Today</p>
        <Button>Add a Server</Button>
      </div>
    </div>
  );
}
