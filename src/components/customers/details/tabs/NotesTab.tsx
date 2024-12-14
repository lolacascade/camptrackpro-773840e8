import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/common/DataTable/DataTable";

interface NotesTabProps {
  notes: any[];
  isLoading: boolean;
}

export function NotesTab({ notes, isLoading }: NotesTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Customer Notes</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable
          data={notes || []}
          columns={[
            { header: "Note", accessorKey: "note" },
            { header: "Tag", accessorKey: "tag" },
            {
              header: "Created",
              accessorKey: "created_at",
              cell: (item) => new Date(item.created_at).toLocaleDateString()
            }
          ]}
          isLoading={isLoading}
        />
      </CardContent>
    </Card>
  );
}