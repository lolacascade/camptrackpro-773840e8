import { MarinaFormData } from '@/types/marina';
import { UseMarinaFormProps } from '@/types/marina/form';
import { useFormState } from './marina/use-form-state';
import { useMarinaSubmit } from './marina/use-marina-submit';

export const useMarinaForm = ({ initialData = {}, onSuccess }: UseMarinaFormProps) => {
  const { formData, handleInputChange } = useFormState(initialData);
  const { handleSubmit: submitForm } = useMarinaSubmit(onSuccess);

  const handleSubmit = (e: React.FormEvent) => {
    submitForm(formData, e);
  };

  return {
    formData,
    handleInputChange,
    handleSubmit,
  };
};