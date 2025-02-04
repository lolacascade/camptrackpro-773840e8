import { useState } from 'react';
import { MarinaFormData } from '@/types/marina';
import { InputChangeEvent, defaultMarinaFormData } from '@/types/marina/form';

export const useFormState = (initialData?: Partial<MarinaFormData>) => {
  const [formData, setFormData] = useState<MarinaFormData>(() => {
    const initial = initialData || {};
    return Object.assign({}, defaultMarinaFormData, initial) as MarinaFormData;
  });

  const handleInputChange = (e: InputChangeEvent) => {
    const { name, value, type } = e.target;
    
    const [section, field] = name.split('.');
    
    if (field === undefined) {
      setFormData(prev => ({
        ...prev,
        [section]: type === 'checkbox' ? value : value
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section as keyof MarinaFormData],
          [field]: type === 'checkbox' ? value : value
        }
      }));
    }
  };

  return {
    formData,
    handleInputChange,
  };
};