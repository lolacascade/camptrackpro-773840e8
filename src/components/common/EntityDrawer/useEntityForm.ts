import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { useSession } from "@supabase/auth-helpers-react";
import { useOrganization } from "@/hooks/use-organization";

type TableName = "sites" | "customers" | "assets" | "bookings" | "maintenance_requests";

interface EntityField {
  name: string;
  label: string;
  type: "text" | "number" | "select" | "boolean";
  required?: boolean;
  options?: Array<{ value: string; label: string }>;
}

interface UseEntityFormProps {
  entity: any;
  tableName: TableName;
  fields: EntityField[];
  onEntityUpdated: () => void;
}

export function useEntityForm({ entity, tableName, fields, onEntityUpdated }: UseEntityFormProps) {
  const { toast } = useToast();
  const session = useSession();
  const { organizationId, accountId } = useOrganization();
  const [formData, setFormData] = useState(
    entity || fields.reduce((acc: any, field) => ({ ...acc, [field.name]: "" }), {})
  );

  const handleFieldChange = (name: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
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
    } catch (error) {
      console.error("Error saving entity:", error);
      toast({
        title: "Error",
        description: "Failed to save entity. Please try again.",
        variant: "destructive",
      });
    }
  };

  return {
    formData,
    handleFieldChange,
    handleSubmit,
  };
}