import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { useSession } from "@supabase/auth-helpers-react";
import { useOrganization } from "@/hooks/use-organization";
import type { Field, TableName, UseEntityFormReturn } from "./types";

export function useEntityForm(
  entity: any,
  fields: Field[],
  tableName: TableName,
  onEntityUpdated: () => void,
  onClose: () => void
): UseEntityFormReturn {
  const { toast } = useToast();
  const session = useSession();
  const { organizationId, accountId } = useOrganization();
  const [formData, setFormData] = useState(
    entity || fields.reduce((acc: any, field) => ({ ...acc, [field.name]: "" }), {})
  );
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    try {
      setIsSaving(true);
      if (!session?.user?.id) {
        toast({
          title: "Error",
          description: "You must be signed in to perform this action.",
          variant: "destructive",
        });
        return;
      }

      // Validate required fields
      const missingFields = fields
        .filter((field) => field.required && !formData[field.name])
        .map((field) => field.label);

      if (missingFields.length > 0) {
        toast({
          title: "Error",
          description: `Please fill in the following required fields: ${missingFields.join(
            ", "
          )}`,
          variant: "destructive",
        });
        return;
      }

      const data = {
        ...formData,
        user_id: session.user.id,
        organization_id: organizationId,
        account_id: accountId,
      };

      if (entity?.id) {
        const { error } = await supabase
          .from(tableName)
          .update(data)
          .eq("id", entity.id);

        if (error) throw error;

        toast({
          title: "Success",
          description: "Entity updated successfully",
        });
      } else {
        const { error } = await supabase.from(tableName).insert([data]);

        if (error) throw error;

        toast({
          title: "Success",
          description: "Entity created successfully",
        });
      }

      onEntityUpdated();
      onClose();
    } catch (error: any) {
      console.error("Error saving entity:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to save entity. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      const { error } = await supabase
        .from(tableName)
        .delete()
        .eq("id", entity.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Entity deleted successfully",
      });

      onEntityUpdated();
      onClose();
    } catch (error: any) {
      console.error("Error deleting entity:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to delete entity. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    formData,
    setFormData,
    isDeleting,
    isSaving,
    handleSave,
    handleDelete,
  };
}