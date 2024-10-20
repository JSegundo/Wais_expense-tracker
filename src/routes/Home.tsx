import ExpensesForm from "../components/ui/ExpensesForm"
import ExpensesHistory from "../components/ExpensesHistory"
import { useLocalStorage } from "usehooks-ts"
import { IExpense } from "../interfaces/IExpenses"
import { motion } from "framer-motion"
import { variantsBalance } from "../utils/motionVariants"

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
        <motion.h1
          key={calculateBalance()} // Unique key to trigger re-animation when balance changes
          variants={variantsBalance}
          initial="initial"
          animate="animate"
        >
          {calculateBalance()} EUR
        </motion.h1>
      </div>

      {/* Register expenses */}
      <ExpensesForm onSubmit={addExpense} />

      {/* Transactions history */}
      <ExpensesHistory />
    </>
  )
}

export default Home
