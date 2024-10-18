import React from "react"
import { Category, Expense } from "../interfaces/IExpenses"

const categories: Category[] = [
  "Food",
  "Transportation",
  "Entertainment",
  "Utilities",
  "Others",
]
interface ExpenseFormProps {
  addExpense: (expense: Expense) => void
}

const RegisterExpensesForm: React.FC<ExpenseFormProps> = ({ addExpense }) => {
  const [amount, setAmount] = React.useState<number>(0)
  const [description, setDescription] = React.useState<string>("")
  const [category, setCategory] = React.useState<Category>("Others")
  const [type, setType] = React.useState<"in" | "out">("in")

  const handleAddExpense = () => {
    const expense = { amount, category, description, id: Date.now(), type }
    addExpense(expense)
    // Reset fields
    setAmount(0)
    setCategory("Others")
    setDescription("")
    setType("in")
  }

  return (
    <form
      className="box"
      onSubmit={(e) => {
        e.preventDefault()
        handleAddExpense()
      }}
    >
      <h4>Add transaction</h4>

      <label htmlFor="amount">How much?</label>
      <input
        type="number"
        name="amount"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        placeholder="Amount"
        required
      />

      <label htmlFor="category">Pick a category</label>
      <select
        name="category"
        value={category}
        onChange={(e) => setCategory(e.target.value as Category)}
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <label htmlFor="description">Add a description</label>
      <input
        name="description"
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        required
      />

      <label htmlFor="type">Pick a type</label>
      <select
        name="type"
        value={type}
        onChange={(e) => setType(e.target.value as "in" | "out")}
      >
        <option value="in">Income</option>
        <option value="out">Expense</option>
      </select>
      <button type="submit">Add Transaction</button>
    </form>
  )
}

export default RegisterExpensesForm
