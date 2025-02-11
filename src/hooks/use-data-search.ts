
import { useState, useEffect, useMemo } from 'react';

export function useDataSearch<T>(data: T[], searchTerm: string, searchFields?: string[]) {
  const [filteredData, setFilteredData] = useState<T[]>(data);

  const defaultSearchFields = useMemo(() => {
    if (data.length === 0) return [];
    const item = data[0];
    return Object.keys(item as object).filter(key => 
      typeof (item as any)[key] === 'string' || 
      typeof (item as any)[key] === 'number' ||
      key === 'email' // Explicitly include email field
    );
  }, [data]);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredData(data);
      return;
    }

    const searchTermLower = searchTerm.toLowerCase();
    const fieldsToSearch = searchFields || defaultSearchFields;

    const filtered = data.filter(item => {
      return fieldsToSearch.some(field => {
        const value = (item as any)[field];
        if (value === null || value === undefined) return false;

        // Handle nested object paths (e.g., "customer.first_name")
        if (field.includes('.')) {
          const parts = field.split('.');
          let nestedValue = item as any;
          for (const part of parts) {
            if (!nestedValue || typeof nestedValue !== 'object') return false;
            nestedValue = nestedValue[part];
          }
          return nestedValue ? String(nestedValue).toLowerCase().includes(searchTermLower) : false;
        }

        // Handle regular fields
        return String(value).toLowerCase().includes(searchTermLower);
      });
    });

    setFilteredData(filtered);
  }, [data, searchTerm, searchFields, defaultSearchFields]);

  return filteredData;
}
