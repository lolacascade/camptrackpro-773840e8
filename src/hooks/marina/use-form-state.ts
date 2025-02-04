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
    // Create a type-safe initial data object
    const safeInitialData: Partial<MarinaFormData> = initialData ?? {};
    
    // Merge default data with provided initial data
    return {
      ...defaultMarinaFormData,
      ...safeInitialData,
    };
  });

  /**
   * Handles form input changes, supporting nested object updates
   * @param section - The section of the form being updated
   * @param field - The specific field within the section
   * @param value - The new value for the field
   */
  const handleInputChange = (section: string, field: string, value: any) => {
    if (field === '') {
      setFormData(prev => ({
        ...prev,
        [section]: value,
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section as keyof MarinaFormData],
          [field]: value,
        },
      }));
    }
  };

  return {
    formData,
    handleInputChange,
  };
};