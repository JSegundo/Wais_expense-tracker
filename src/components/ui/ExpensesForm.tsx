import React from "react"
import { categories, Category, IExpense } from "../../interfaces/IExpenses"

interface ExpenseFormProps {
  initialExpense?: IExpense | null // Optional prop for editing
  onSubmit: (expense: IExpense) => void // either for add new expense, or edit existing one
}
const ExpensesForm: React.FC<ExpenseFormProps> = ({
  initialExpense,
  onSubmit,
}) => {
  // states are initialized empty when registering new expense, or with expense values when editing.
  const [amount, setAmount] = React.useState<number>(
    initialExpense?.amount || 0
  )
  const [category, setCategory] = React.useState<Category>(
    initialExpense?.category || "Others"
  )
  const [type, setType] = React.useState<"in" | "out">(
    initialExpense?.type || "in"
  )
  const [date, setDate] = React.useState(initialExpense?.date || "")

  const handleSubmit = () => {
    const expense = {
      amount,
      category,
      id: initialExpense ? initialExpense.id : Date.now(),
      type,
      date: date ? new Date(date).toISOString().split("T")[0] : "", // Format date as YYYY-MM-DD
    }
    onSubmit(expense)
    // Reset fields
    setAmount(0)
    setCategory("Others")
    setType("in")
  }

  return (
    <form
      className="box"
      onSubmit={(e) => {
        e.preventDefault()
        handleSubmit()
      }}
    >
      <h4>{initialExpense ? "Edit Transaction" : "Add Transaction"}</h4>

      <label htmlFor="amount">
        How much?
        <input
          type="number"
          step=".01"
          name="amount"
          value={amount}
          min={1}
          onChange={(e) => setAmount(Number(e.target.value))}
          placeholder="Amount"
          required
        />
      </label>
      <label htmlFor="type">
        Pick a type
        <select
          name="type"
          value={type}
          onChange={(e) => setType(e.target.value as "in" | "out")}
          required
        >
          <option value="in">Income</option>
          <option value="out">Expense</option>
        </select>
      </label>
      <label htmlFor="category">
        Pick a category
        <select
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value as Category)}
          required
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </label>
      {/* Add a date input */}
      <label htmlFor="date">
        When?
        <input
          name="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          placeholder="Date"
          required
        />
      </label>

      <button type="submit">
        {initialExpense ? "Save Changes" : "Add Transaction"}
      </button>
    </form>
  )
}

export default ExpensesForm
