import { useState } from 'react';
import { MarinaFormData } from '@/types/marina';
import { InputChangeEvent, defaultMarinaFormData } from '@/types/marina/form';

export const useFormState = (initialData?: Partial<MarinaFormData>) => {
  const [formData, setFormData] = useState<MarinaFormData>(() => {
    if (!initialData) {
      return defaultMarinaFormData;
    }
    
    // Ensure we're working with objects by using type assertion
    const initial = initialData as Record<string, unknown>;
    const defaultData = defaultMarinaFormData as Record<string, unknown>;
    
    return {
      ...defaultData,
      ...initial
    } as MarinaFormData;
  });

  const handleInputChange = (e: InputChangeEvent) => {
    const { name, value, type } = e.target;
    
    const [section, field] = name.split('.');
    
    if (field === undefined) {
      setFormData((prev: MarinaFormData) => {
        const updatedData = {
          ...prev,
          [section]: type === 'checkbox' ? value : value
        };
        return updatedData;
      });
    } else {
      setFormData((prev: MarinaFormData) => {
        const sectionData = prev[section as keyof MarinaFormData] as Record<string, unknown>;
        const updatedData = {
          ...prev,
          [section]: {
            ...sectionData,
            [field]: type === 'checkbox' ? value : value
          }
        };
        return updatedData;
      });
    }
  };

  return {
    formData,
    handleInputChange,
  };
};