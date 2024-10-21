import { IExpense } from "../../interfaces/IExpenses"
import { Link } from "react-router-dom"
import ExpensesList from "../ui/ExpensesList"
import "./_expensesHistory.modules.scss"

export interface ExpenseHistoryProps {
  expenses: IExpense[]
}
const ExpensesHistory = ({ expenses }: ExpenseHistoryProps) => {
  return (
    <section className="expenses-section">
      <article>
        <h1>Transactions</h1>
        <button className="link">
          <Link to={"all"} state={expenses}>
            See all
          </Link>
        </button>
      </article>

      <ExpensesList expenses={expenses} limit={4} />
    </section>
  )
}

export default ExpensesHistory
