
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export function BookingForm() {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input id="title" placeholder="Enter booking title" />
      </div>
    </div>
  );
}
