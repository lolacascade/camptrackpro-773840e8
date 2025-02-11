
import { useState, useEffect, useMemo } from 'react';

export function useDataSearch<T>(data: T[], searchTerm: string, searchFields?: string[]) {
  const [filteredData, setFilteredData] = useState<T[]>(data);

  const defaultSearchFields = useMemo(() => {
    if (data.length === 0) return [];
    const item = data[0];
    return Object.keys(item as object).filter(key => 
      typeof (item as any)[key] === 'string' || 
      typeof (item as any)[key] === 'number' ||
      typeof (item as any)[key] === 'object'
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
        let value = (item as any)[field];

        // Handle nested object paths (e.g., "customer.first_name")
        if (field.includes('.')) {
          const parts = field.split('.');
          let current = item as any;
          for (const part of parts) {
            if (!current || typeof current !== 'object') {
              return false;
            }
            current = current[part];
          }
          value = current;
        }

        if (value === null || value === undefined) {
          return false;
        }

        // Handle objects
        if (typeof value === 'object') {
          return Object.values(value).some(v => 
            String(v).toLowerCase().includes(searchTermLower)
          );
        }

        return String(value).toLowerCase().includes(searchTermLower);
      });
    });

    setFilteredData(filtered);
  }, [data, searchTerm, searchFields, defaultSearchFields]);

  return filteredData;
}
