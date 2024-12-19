import { EntityDrawer } from "@/components/common/EntityDrawer"
import type { Expense, ExpenseType, ExpenseStatus } from "@/types/expense"

interface AddExpenseDrawerProps {
  expense: Expense | null
  open: boolean
  onClose: () => void
  onExpenseUpdated: () => void
}

const EXPENSE_FIELDS = [
  {
    name: "description",
    label: "Description",
    type: "text" as const,
    required: true
  },
  {
    name: "amount",
    label: "Amount",
    type: "number" as const,
    required: true
  },
  {
    name: "category",
    label: "Category",
    type: "select" as const,
    required: true,
    options: [
      { value: "Maintenance", label: "Maintenance" },
      { value: "Utilities", label: "Utilities" },
      { value: "Supplies", label: "Supplies" },
      { value: "Insurance", label: "Insurance" },
      { value: "Staff", label: "Staff" },
      { value: "Marketing", label: "Marketing" },
      { value: "Administrative Costs", label: "Administrative Costs" },
      { value: "Taxes", label: "Taxes" },
      { value: "Capital Expenditures", label: "Capital Expenditures" },
      { value: "Other", label: "Other" }
    ]
  },
  {
    name: "date",
    label: "Date",
    type: "date" as const,
    required: true
  },
  {
    name: "status",
    label: "Status",
    type: "select" as const,
    required: true,
    options: [
      { value: "completed", label: "Completed" },
      { value: "pending", label: "Pending" },
      { value: "cancelled", label: "Cancelled" }
    ]
  },
  {
    name: "payment_method",
    label: "Payment Method",
    type: "select" as const,
    options: [
      { value: "cash", label: "Cash" },
      { value: "credit_card", label: "Credit Card" },
      { value: "bank_transfer", label: "Bank Transfer" },
      { value: "check", label: "Check" },
      { value: "other", label: "Other" }
    ]
  },
  {
    name: "notes",
    label: "Notes",
    type: "text" as const
  }
]

export function AddExpenseDrawer({
  expense,
  open,
  onClose,
  onExpenseUpdated
}: AddExpenseDrawerProps) {
  return (
    <EntityDrawer
      entity={expense}
      open={open}
      onClose={onClose}
      onEntityUpdated={onExpenseUpdated}
      title="Expense"
      fields={EXPENSE_FIELDS}
      tableName="expenses"
    />
  )
}