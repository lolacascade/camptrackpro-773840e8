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
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-center justify-between">
              <div>
                <div className="font-medium">{activity.customer}</div>
                <div className="text-sm text-gray-600">
                  {activity.type === "check-in"
                    ? "Checked in at"
                    : activity.type === "check-out"
                    ? "Checked out from"
                    : "Requested maintenance for"}{" "}
                  {activity.slip}
                </div>
              </div>
              <div className="text-sm text-gray-500">{activity.time}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}