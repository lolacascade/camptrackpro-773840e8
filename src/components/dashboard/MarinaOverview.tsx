import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const slips = [
  { id: "A1", status: "occupied", size: "30ft" },
  { id: "A2", status: "available", size: "40ft" },
  { id: "A3", status: "maintenance", size: "35ft" },
  { id: "B1", status: "occupied", size: "45ft" },
  { id: "B2", status: "occupied", size: "50ft" },
  { id: "B3", status: "available", size: "30ft" },
];

export function MarinaOverview() {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Marina Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4">
          {slips.map((slip) => (
            <div
              key={slip.id}
              className={`rounded-lg p-4 ${
                slip.status === "occupied"
                  ? "bg-primary/10"
                  : slip.status === "available"
                  ? "bg-success/10"
                  : "bg-warning/10"
              }`}
            >
              <div className="font-bold">{slip.id}</div>
              <div className="text-sm text-gray-600">{slip.size}</div>
              <div className="mt-1 text-xs capitalize">{slip.status}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}