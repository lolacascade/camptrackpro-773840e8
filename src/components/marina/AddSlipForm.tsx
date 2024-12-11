import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface AddSlipFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

interface FormData {
  name: string;
  dock: string;
  length_ft: number;
  width_ft: number;
}

export function AddSlipForm({ onSuccess, onCancel }: AddSlipFormProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      setIsLoading(true);
      const { error } = await supabase
        .from('slips')
        .insert([
          {
            name: data.name,
            dock: data.dock,
            length_ft: data.length_ft,
            width_ft: data.width_ft,
            status: 'available'
          }
        ]);

      if (error) throw error;

      onSuccess();
    } catch (error) {
      console.error('Error adding slip:', error);
      toast({
        title: "Error",
        description: "Failed to add slip. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Slip Name</Label>
        <Input
          id="name"
          {...register("name", { required: "Slip name is required" })}
          placeholder="Enter slip name"
        />
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="dock">Dock</Label>
        <Input
          id="dock"
          {...register("dock", { required: "Dock is required" })}
          placeholder="Enter dock (e.g., A, B, C)"
        />
        {errors.dock && (
          <p className="text-sm text-red-500">{errors.dock.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="length_ft">Length (ft)</Label>
        <Input
          id="length_ft"
          type="number"
          {...register("length_ft", { 
            required: "Length is required",
            min: { value: 1, message: "Length must be greater than 0" }
          })}
          placeholder="Enter length in feet"
        />
        {errors.length_ft && (
          <p className="text-sm text-red-500">{errors.length_ft.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="width_ft">Width (ft)</Label>
        <Input
          id="width_ft"
          type="number"
          {...register("width_ft", { 
            required: "Width is required",
            min: { value: 1, message: "Width must be greater than 0" }
          })}
          placeholder="Enter width in feet"
        />
        {errors.width_ft && (
          <p className="text-sm text-red-500">{errors.width_ft.message}</p>
        )}
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Adding..." : "Add Slip"}
        </Button>
      </div>
    </form>
  );
}