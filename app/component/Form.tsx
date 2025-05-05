import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

interface WebsiteFormProps {
  onSubmit: (data: {
    name: string;
    url: string;
    discordEnabled: boolean;
    discordUrl: string;
  }) => void;
  onCancel: () => void;
}

const Form: React.FC<WebsiteFormProps> = ({ onSubmit, onCancel }) => {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [discordEnabled, setDiscordEnabled] = useState(false);
  const [discordUrl, setDiscordUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name,
      url,
      discordEnabled,
      discordUrl: discordEnabled ? discordUrl : "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 ">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            placeholder="My Awesome Website"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="transition-all duration-200 "
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="url">Website URL</Label>
          <Input
            id="url"
            placeholder="https://example.com"
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            className="transition-all duration-200"
          />
        </div>

        <div className="flex items-center justify-between space-x-2 pt-2">
          <Label htmlFor="discord-notifications" className="cursor-pointer">
            Add Discord Notification
          </Label>
          <Switch
            id="discord-notifications"
            checked={discordEnabled}
            onCheckedChange={setDiscordEnabled}
          />
        </div>

        <div
  className={`space-y-2 transition-all duration-300 ${
    discordEnabled
      ? "max-h-[200px] opacity-100"
      : "max-h-0 opacity-0 pointer-events-none overflow-hidden"
  }`}
>

          <Label
            htmlFor="discord-url"
            className={`transition-all duration-200 ${
              discordEnabled ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            Discord Webhook URL
          </Label>
          <Input
            id="discord-url"
            placeholder="https://discord.com/api/webhooks/..."
            value={discordUrl}
            onChange={(e) => setDiscordUrl(e.target.value)}
            disabled={!discordEnabled}
            required={discordEnabled}
            className={`transition-all duration-200 ${
              !discordEnabled ? "bg-muted" : ""
            }`}
          />
        </div>
      </div>
      
      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
};

export default Form;