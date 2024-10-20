import React from "react"
import ExpensesList from "../components/ui/ExpensesList"
import { categories, IExpense } from "../interfaces/IExpenses"
import { useLocalStorage } from "usehooks-ts"

export interface FilterOptions {
  type?: "in" | "out" | ""
  category?: string
  startDate?: string
  endDate?: string
}

const AllTransactions = () => {
  const [expenses] = useLocalStorage<IExpense[]>("expenses", [])

  const [filters, setFilters] = React.useState<FilterOptions>({
    type: "",
    category: "",
    startDate: "",
  })

  const handleFilterChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target
    setFilters({ ...filters, [name]: value })
  }

  const filteredTransactions = expenses.filter((exp: IExpense) => {
    const matchesType = filters.type ? exp.type === filters.type : true
    const matchesCategory = filters.category
      ? exp.category === filters.category
      : true
    const matchesDate =
      (!filters.startDate ||
        new Date(exp.date) >= new Date(filters.startDate)) &&
      (!filters.endDate || new Date(exp.date) <= new Date(filters.endDate))

    return matchesType && matchesCategory && matchesDate
  })

  return (
    <section className="expenses-section">
      <h1>All Transactions</h1>
      {/* Filter Buttons */}
      <div className="filters">
        <select name="type" onChange={handleFilterChange}>
          <option value="">All Types</option>
          <option value="in">Income</option>
          <option value="out">Expense</option>
        </select>

        <select name="category" onChange={handleFilterChange}>
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <input
          type="date"
          name="startDate"
          onChange={handleFilterChange}
          required
          value={filters.startDate}
        />
        <input
          type="date"
          name="endDate"
          onChange={handleFilterChange}
          value={filters.endDate}
        />
      </div>

      <ExpensesList expenses={filteredTransactions} showEdit />
    </section>
  )
}

export default AllTransactions
