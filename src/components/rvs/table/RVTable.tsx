
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { RV } from "@/types/rv"
import { Button } from "@/components/ui/button"
import { Edit } from "lucide-react"

interface RVTableProps {
  rvs: RV[]
  onEdit: (rv: RV) => void
  isLoading?: boolean
}

export function RVTable({ rvs, onEdit, isLoading }: RVTableProps) {
  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Make</TableHead>
          <TableHead>Model</TableHead>
          <TableHead>Year</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rvs.map((rv) => (
          <TableRow key={rv.id}>
            <TableCell>{rv.make}</TableCell>
            <TableCell>{rv.model}</TableCell>
            <TableCell>{rv.year}</TableCell>
            <TableCell>
              {rv.customer ? `${rv.customer.first_name} ${rv.customer.last_name}` : '-'}
            </TableCell>
            <TableCell>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onEdit(rv)}
              >
                <Edit className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
