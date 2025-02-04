
import { useState } from 'react';
import { MarinaFormData } from '@/types/marina';
import { InputChangeEvent, defaultMarinaFormData } from '@/types/marina/form';

export const useFormState = (initialData?: Partial<MarinaFormData>) => {
  const [formData, setFormData] = useState<MarinaFormData>(() => {
    if (!initialData) {
      return defaultMarinaFormData;
    }
    
    // Create new object merging default and initial data
    return {
      ...defaultMarinaFormData,
      ...initialData
    };
  });

  const handleInputChange = (e: InputChangeEvent) => {
    const { name, value, type } = e.target;
    const [section, field] = name.split('.');
    
    if (field === undefined) {
      setFormData((prev: MarinaFormData) => ({
        ...prev,
        [section]: type === 'checkbox' ? value : value
      }));
    } else {
      setFormData((prev: MarinaFormData) => {
        const sectionData = prev[section as keyof MarinaFormData] as Record<string, unknown>;
        return {
          ...prev,
          [section]: {
            ...sectionData,
            [field]: type === 'checkbox' ? value : value
          }
        };
      });
    }
  };

  return {
    formData,
    handleInputChange,
  };
};
