import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

interface MarinaSettings {
  name: string;
  address: string;
  phone: string;
  email: string;
}

export default function Settings() {
  const { toast } = useToast();
  const [settings, setSettings] = useState<MarinaSettings>({
    name: 'Marina Manager',
    address: '123 Harbor Drive',
    phone: '(555) 123-4567',
    email: 'contact@marinamanager.com',
  });

  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "Your marina settings have been updated.",
    });
  };

  return (
    <Layout>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Settings</h1>

        <div className="max-w-2xl space-y-4">
          <div className="space-y-2">
            <Label htmlFor="marina-name">Marina Name</Label>
            <Input
              id="marina-name"
              value={settings.name}
              onChange={(e) =>
                setSettings({ ...settings, name: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="marina-address">Address</Label>
            <Input
              id="marina-address"
              value={settings.address}
              onChange={(e) =>
                setSettings({ ...settings, address: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="marina-phone">Phone</Label>
            <Input
              id="marina-phone"
              value={settings.phone}
              onChange={(e) =>
                setSettings({ ...settings, phone: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="marina-email">Email</Label>
            <Input
              id="marina-email"
              type="email"
              value={settings.email}
              onChange={(e) =>
                setSettings({ ...settings, email: e.target.value })
              }
            />
          </div>

          <Button onClick={handleSave}>Save Changes</Button>
        </div>
      </div>
    </Layout>
  );
}