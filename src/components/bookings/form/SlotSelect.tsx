import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "cmdk";
import { Slot } from "@/types/slot";
import { DateRange } from "react-day-picker";

interface SlotSelectProps {
  selectedSlotId: number | null;
  onSlotSelect: (slotId: number | null) => void;
  dateRange: DateRange | undefined;
  assetId: number | null;
}

export function SlotSelect({ 
  selectedSlotId, 
  onSlotSelect, 
  dateRange,
  assetId 
}: SlotSelectProps) {
  const [availableSlots, setAvailableSlots] = useState<Slot[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    const fetchAvailableSlots = async () => {
      if (!dateRange?.from || !dateRange?.to || !assetId) {
        setAvailableSlots([]);
        setIsLoading(false);
        return;
      }

      try {
        const { data: allSlots, error: slotsError } = await supabase
          .from('slots')
          .select('*')
          .eq('status', 'available')
          .order('name');
        
        if (slotsError) throw slotsError;

        const { data: existingBookings, error: bookingsError } = await supabase
          .from('bookings')
          .select('slot_id')
          .or(`check_in_date.lte.${dateRange.to.toISOString()},check_out_date.gte.${dateRange.from.toISOString()}`);

        if (bookingsError) throw bookingsError;

        const bookedSlotIds = new Set(existingBookings?.map(b => b.slot_id) || []);
        
        // Ensure proper typing of slots data
        const typedSlots: Slot[] = (allSlots || []).map(slot => ({
          ...slot,
          status: slot.status as Slot['status'], // Explicitly type the status
          id: slot.id,
          name: slot.name,
          location_identifier: slot.location_identifier
        })).filter(slot => !bookedSlotIds.has(slot.id));

        setAvailableSlots(typedSlots);
        
        // Set initial search value if slot is selected
        if (selectedSlotId) {
          const selectedSlot = typedSlots.find(s => s.id === selectedSlotId);
          if (selectedSlot) {
            setSearchValue(selectedSlot.name);
          }
        }
      } catch (error) {
        console.error('Error fetching available slots:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAvailableSlots();
  }, [dateRange, assetId]);

  const handleSelect = (slotId: string) => {
    const slot = availableSlots.find(s => s.id === parseInt(slotId));
    if (slot) {
      onSlotSelect(slot.id);
      setSearchValue(slot.name);
      setShowSuggestions(false);
    }
  };

  const filteredSlots = availableSlots.filter(slot =>
    slot.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className="space-y-2">
      <Label>Available Sites</Label>
      <div className="relative">
        <Input
          type="text"
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
            setShowSuggestions(true);
            if (!e.target.value) {
              onSlotSelect(null);
            }
          }}
          onFocus={() => setShowSuggestions(true)}
          placeholder={
            !dateRange?.from || !dateRange?.to 
              ? "Select dates first"
              : !assetId
              ? "Select an RV first"
              : "Search available sites..."
          }
          disabled={!dateRange?.from || !dateRange?.to || !assetId}
          className="w-full"
        />

        {showSuggestions && searchValue && filteredSlots.length > 0 && (
          <div className="absolute z-[100] w-full mt-1 bg-white border rounded-md shadow-lg">
            <Command className="border-none bg-white rounded-md">
              <CommandList className="max-h-[200px] overflow-y-auto">
                <CommandEmpty className="p-2">No sites found.</CommandEmpty>
                <CommandGroup className="bg-white">
                  {filteredSlots.map(slot => (
                    <CommandItem
                      key={slot.id}
                      value={slot.id.toString()}
                      onSelect={handleSelect}
                      className="cursor-pointer hover:bg-gray-100 p-2"
                    >
                      {slot.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </div>
        )}
      </div>
    </div>
  );
}