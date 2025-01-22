import { useState, useEffect, useMemo } from 'react';

export function useDataSearch<T>(data: T[], searchTerm: string) {
  const [filteredData, setFilteredData] = useState<T[]>(data);

  const searchFields = useMemo(() => {
    if (data.length === 0) return [];
    const item = data[0];
    return Object.keys(item as object).filter(key => 
      typeof (item as any)[key] === 'string' || 
      typeof (item as any)[key] === 'number'
    );
  }, [data]);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredData(data);
      return;
    }

    const searchTermLower = searchTerm.toLowerCase();
    const filtered = data.filter(item => {
      return searchFields.some(field => {
        const value = (item as any)[field];
        if (value === null || value === undefined) return false;
        return String(value).toLowerCase().includes(searchTermLower);
      });
    });

    setFilteredData(filtered);
  }, [data, searchTerm, searchFields]);

  return filteredData;
}