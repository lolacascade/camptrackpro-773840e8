import { useState, useEffect } from "react";
import { Asset } from "@/types/asset";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@supabase/auth-helpers-react";
import { useToast } from "@/components/ui/use-toast";

interface UseAssetFormProps {
  onClose: () => void;
  onAssetAdded: () => void;
  customerId: string | null;
}

export function useAssetForm({ onClose, onAssetAdded, customerId }: UseAssetFormProps) {
  const { toast } = useToast();
  const session = useSession();
  const [availableSlots, setAvailableSlots] = useState<Array<{ id: number; name: string }>>([]);
  const [newAsset, setNewAsset] = useState<Partial<Asset>>({
    asset_name: '',
    asset_size: '',
    customer_id: customerId,
    slip_id: null,
    asset_type: '',
    name: '',
    type: '',
    status: 'available',
    daily_rate: 0
  });

  useEffect(() => {
    const fetchAvailableSlots = async () => {
      const { data, error } = await supabase
        .from('slots')
        .select('id, name')
        .eq('status', 'available');

      if (error) {
        console.error('Error fetching slots:', error);
        return;
      }

      setAvailableSlots(data || []);
    };

    fetchAvailableSlots();
  }, []);

  const handleSubmit = async () => {
    if (!session) {
      toast({
        title: "Error",
        description: "You must be signed in to add assets.",
        variant: "destructive",
      });
      return;
    }

    if (!newAsset.asset_name || !newAsset.asset_size || !newAsset.asset_type || !newAsset.slip_id) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('assets')
        .insert({
          ...newAsset,
          user_id: session.user.id,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });

      if (error) throw error;

      onClose();
      setNewAsset({
        asset_name: '',
        asset_size: '',
        customer_id: null,
        slip_id: null,
        asset_type: '',
        name: '',
        type: '',
        status: 'available',
        daily_rate: 0
      });
      
      toast({
        title: "Success",
        description: "Asset added successfully.",
      });
      
      onAssetAdded();
    } catch (error) {
      console.error('Error adding asset:', error);
      toast({
        title: "Error",
        description: "Failed to add asset.",
        variant: "destructive",
      });
    }
  };

  return {
    newAsset,
    setNewAsset,
    availableSlots,
    handleSubmit
  };
}