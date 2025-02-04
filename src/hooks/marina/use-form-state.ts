import { useState } from 'react';
import { MarinaFormData } from '@/types/marina';
import { InputChangeEvent, defaultMarinaFormData } from '@/types/marina/form';

/**
 * Custom hook for managing marina form state
 * @param initialData - Optional partial marina form data to initialize the form
 * @returns Object containing form state and update handler
 */
export const useFormState = (initialData?: Partial<MarinaFormData>) => {
  // Initialize form state with default values merged with any provided initial data
  const [formData, setFormData] = useState<MarinaFormData>(() => {
    const initial = initialData as Record<string, any> || {};
    const defaults = defaultMarinaFormData as Record<string, any>;
    
    return {
      ...defaults,
      ...initial
    } as MarinaFormData;
  });

  const handleInputChange = (e: InputChangeEvent) => {
    const { name, value, type } = e.target;
    
    // Handle nested object updates
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