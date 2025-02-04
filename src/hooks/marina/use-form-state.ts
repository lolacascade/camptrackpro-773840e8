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
    return {
      ...defaultMarinaFormData,
      ...(initialData || {}),
    };
  });

  /**
   * Handles form input changes, supporting nested object updates
   * @param e - Input change event with name, value, and type
   */
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