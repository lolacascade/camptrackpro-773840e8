import { useState } from 'react';
import { MarinaFormData } from '@/types/marina';
import { InputChangeEvent, defaultMarinaFormData } from '@/types/marina/form';

export const useFormState = (initialData: Partial<MarinaFormData> = {}) => {
  const [formData, setFormData] = useState<MarinaFormData>(() => ({
    ...defaultMarinaFormData,
    ...(initialData as MarinaFormData),
  }));

  const handleInputChange = (e: InputChangeEvent) => {
    const { name, value, type } = e.target;
    const nameParts = name.split('.');

    if (nameParts.length === 1) {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'number' ? Number(value) : value,
      }));
    } else {
      const [section, field] = nameParts;
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section as keyof MarinaFormData],
          [field]: type === 'checkbox' ? value : value,
        },
      }));
    }
  };

  return {
    formData,
    handleInputChange,
  };
};