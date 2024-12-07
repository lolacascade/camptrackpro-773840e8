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
    <Card className="col-span-2 border border-[#E8EBEB] rounded-xl bg-transparent">
      <CardHeader>
        <CardTitle className="text-[#133134]">Marina Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
              <div className="font-bold text-[#133134]">{slip.id}</div>
              <div className="text-base text-[#3E4238]">{slip.size}</div>
              <div className="mt-1 text-base capitalize text-[#3E4238]">{slip.status}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}