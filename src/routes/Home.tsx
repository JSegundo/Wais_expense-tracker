import RegisterExpensesForm from "../components/RegisterExpenses"
import ExpensesHistory from "../components/ExpensesHistory"
import { useLocalStorage } from "usehooks-ts"
import { Expense } from "../interfaces/IExpenses"

const Home = () => {
  const [expenses, setExpenses] = useLocalStorage<Expense[]>("expenses", [])

  const addExpense = (expense: Expense) => {
    const updatedExpenses = [...expenses, expense]
    setExpenses(updatedExpenses)
  }

  return (
    <>
      {/* calculate balance from mapping expenses */}
      <h6>Total balance</h6>
      <h1>612,45 EUR</h1>

      {/* Register expenses */}
      <RegisterExpensesForm addExpense={addExpense} />

      {/* transactions history */}
      <ExpensesHistory expenses={expenses} />
    </>
  )
}

export default Home
