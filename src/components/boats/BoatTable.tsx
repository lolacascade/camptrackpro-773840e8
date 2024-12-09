import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Boat } from "@/types/boat"
import { Edit2, ArrowUpDown } from "lucide-react"
import { Card } from "@/components/ui/card"
import { useState, useMemo } from "react"
import { BoatTableHeader } from "./BoatTableHeader"
import { BoatTablePagination } from "./BoatTablePagination"

interface BoatTableProps {
  boats: Boat[]
  onEdit: (boat: Boat) => void
}

export function BoatTable({ boats, onEdit }: BoatTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Boat
    direction: "asc" | "desc"
  } | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 25

  const handleSort = (key: keyof Boat) => {
    setSortConfig((current) => ({
      key,
      direction:
        current?.key === key && current.direction === "asc" ? "desc" : "asc",
    }))
  }

  const filteredAndSortedBoats = useMemo(() => {
    let result = [...boats]

    if (searchTerm) {
      result = result.filter(
        (boat) =>
          boat.boat_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          boat.boat_size?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (sortConfig) {
      result.sort((a, b) => {
        const aValue = a[sortConfig.key]
        const bValue = b[sortConfig.key]

        if (aValue === null) return 1
        if (bValue === null) return -1
        if (aValue === bValue) return 0

        const comparison = aValue < bValue ? -1 : 1
        return sortConfig.direction === "asc" ? comparison : -comparison
      })
    }

    return result
  }, [boats, searchTerm, sortConfig])

  const totalPages = Math.ceil(filteredAndSortedBoats.length / itemsPerPage)
  const paginatedBoats = filteredAndSortedBoats.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const SortButton = ({ column }: { column: keyof Boat }) => (
    <Button
      variant="ghost"
      size="sm"
      className="h-8 data-[state=sorted]:bg-muted"
      onClick={() => handleSort(column)}
    >
      <ArrowUpDown className="h-4 w-4" />
    </Button>
  )

  return (
    <Card className="border border-[rgb(212,219,224)] rounded-2xl">
      <div className="p-4">
        <BoatTableHeader 
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                Boat Name
                <SortButton column="boat_name" />
              </TableHead>
              <TableHead>
                Size
                <SortButton column="boat_size" />
              </TableHead>
              <TableHead>
                Slip Number
                <SortButton column="slip_id" />
              </TableHead>
              <TableHead>
                Customer ID
                <SortButton column="customer_id" />
              </TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedBoats.map((boat) => (
              <TableRow key={boat.id}>
                <TableCell className="font-medium">{boat.boat_name}</TableCell>
                <TableCell>{boat.boat_size}</TableCell>
                <TableCell>{boat.slip_id ? `Slip ${boat.slip_id}` : '-'}</TableCell>
                <TableCell>{boat.customer_id || '-'}</TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(boat)}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <BoatTablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </Card>
  );
}