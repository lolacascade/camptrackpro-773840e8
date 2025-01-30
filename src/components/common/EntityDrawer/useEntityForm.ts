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
  
  // Set default values, including today's date for date fields
  const defaultValues = fields.reduce((acc: any, field) => {
    if (field.type === 'date') {
      acc[field.name] = new Date().toISOString();
    } else if (field.type === 'text' || field.type === 'textarea') {
      acc[field.name] = "";
    } else if (field.type === 'number') {
      acc[field.name] = null;
    } else if (field.type === 'select') {
      acc[field.name] = field.options?.[0]?.value || "";
    }
    return acc;
  }, {});

  const [formData, setFormData] = useState(
    entity || defaultValues
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

      // Only validate required fields
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

      // Clean up form data to handle empty strings and type conversions for optional fields
      const cleanedData = Object.entries(formData).reduce((acc: any, [key, value]) => {
        const field = fields.find(f => f.name === key);
        
        // Handle empty strings and type conversions
        if (!field?.required && (value === "" || value === null || value === undefined)) {
          acc[key] = null;
        } else if (field?.type === 'number' && value === "") {
          acc[key] = null;
        } else if (field?.type === 'checkbox' && value === "") {
          acc[key] = false;
        } else {
          acc[key] = value;
        }
        
        return acc;
      }, {});

      const data = {
        ...cleanedData,
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
          description: "Site updated successfully",
        });
      } else {
        const { error } = await supabase.from(tableName).insert([data]);

        if (error) throw error;

        toast({
          title: "Success",
          description: "Site created successfully",
        });
      }

      onEntityUpdated();
      onClose();
    } catch (error: any) {
      console.error("Error saving entity:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to save site. Please try again.",
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
        description: "Site deleted successfully",
      });

      onEntityUpdated();
      onClose();
    } catch (error: any) {
      console.error("Error deleting entity:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to delete site. Please try again.",
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