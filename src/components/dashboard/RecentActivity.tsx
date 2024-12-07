import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const activities = [
  {
    id: 1,
    type: "check-in",
    customer: "John Smith",
    slip: "A1",
    time: "2 hours ago",
  },
  {
    id: 2,
    type: "maintenance",
    customer: "Sarah Johnson",
    slip: "B2",
    time: "4 hours ago",
  },
  {
    id: 3,
    type: "check-out",
    customer: "Mike Wilson",
    slip: "C3",
    time: "6 hours ago",
  },
];

export function RecentActivity() {
  return (
    <Card className="border border-[#19383C] rounded-xl bg-transparent">
      <CardHeader>
        <CardTitle className="text-[#133134]">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-center justify-between">
              <div>
                <div className="font-medium text-[#133134]">{activity.customer}</div>
                <div className="text-base text-[#3E4238]">
                  {activity.type === "check-in"
                    ? "Checked in at"
                    : activity.type === "check-out"
                    ? "Checked out from"
                    : "Requested maintenance for"}{" "}
                  {activity.slip}
                </div>
              </div>
              <div className="text-base text-[#3E4238]">{activity.time}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}