import ExpensesForm from "../components/RegisterExpenses"
import ExpensesHistory from "../components/ExpensesHistory"
import { useLocalStorage } from "usehooks-ts"
import { IExpense } from "../interfaces/IExpenses"

const Home = () => {
  const [expenses, setExpenses] = useLocalStorage<IExpense[]>("expenses", [])

  const addExpense = (expense: IExpense) => {
    const updatedExpenses = [expense, ...expenses]
    setExpenses(updatedExpenses)
  }

  const calculateBalance = () => {
    return expenses.reduce((total, expense) => {
      return expense.type === "in"
        ? total + expense.amount
        : total - expense.amount
    }, 0)
  }

  return (
    <>
      {/* Calculate balance from mapping expenses */}
      <div>
        <label>Total balance</label>
        <h1>{calculateBalance()} EUR</h1>
      </div>

      {/* Register expenses */}
      <ExpensesForm onSubmit={addExpense} />

      {/* Transactions history */}
      <ExpensesHistory expenses={expenses} />
    </>
  )
}

export default Home
