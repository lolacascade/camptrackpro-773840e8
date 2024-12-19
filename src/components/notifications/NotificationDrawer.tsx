import { ScrollArea } from "@/components/ui/scroll-area";
import { BaseDrawer } from "@/components/common/BaseDrawer";

interface Notification {
  id: string;
  title: string;
  message: string;
  date: Date;
  read: boolean;
}

interface NotificationDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
}

export function NotificationDrawer({
  open,
  onOpenChange,
  notifications,
  onMarkAsRead,
}: NotificationDrawerProps) {
  const handleClose = () => {
    onOpenChange(false);
  };

  return (
    <BaseDrawer
      open={open}
      onClose={handleClose}
      title="Notifications"
    >
      <ScrollArea className="h-[calc(100vh-8rem)]">
        <div className="flex flex-col gap-2">
          {notifications.length === 0 ? (
            <p className="text-center text-muted-foreground py-4">
              No notifications
            </p>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 rounded-lg border ${
                  notification.read ? "bg-background" : "bg-accent"
                }`}
                onClick={() => onMarkAsRead(notification.id)}
              >
                <h4 className="font-semibold">{notification.title}</h4>
                <p className="text-sm text-muted-foreground">
                  {notification.message}
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  {new Date(notification.date).toLocaleString()}
                </p>
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </BaseDrawer>
  );
}