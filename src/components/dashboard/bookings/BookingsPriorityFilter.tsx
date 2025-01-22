import { SelectField } from "@/components/common/FormFields/SelectField";

interface BookingsPriorityFilterProps {
  value: string;
  onChange: (value: string) => void;
}

export function BookingsPriorityFilter({ value, onChange }: BookingsPriorityFilterProps) {
  const priorityOptions = [
    { value: 'all', label: 'All Priorities' },
    { value: 'high', label: 'High Priority' },
    { value: 'medium', label: 'Medium Priority' },
    { value: 'low', label: 'Low Priority' }
  ];

  return (
    <SelectField
      value={value}
      onChange={onChange}
      options={priorityOptions}
      placeholder="Filter by priority"
      className="w-[180px]"
    />
  );
}