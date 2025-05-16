// types.ts

export interface Ping {
    id: number;
    status: string;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface Project {
    id: number;
    name: string;
    url: string;
    discordEnabled: boolean;
    discordUrl: string;
    ping: Ping[];
  }

  export interface NotificationJob {
    projectName: string;
    status: string;
    url: string;
    email: string | null;
    discord: string | null;
    type: "ping-error" | "ping-failed";
  }
  
  