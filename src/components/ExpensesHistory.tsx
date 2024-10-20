import { Link } from "react-router-dom"
import ExpensesList from "./ui/ExpensesList"

const ExpensesHistory = () => {
  return (
    <section className="expenses-section">
      <article>
        <h1>Transactions</h1>
        <button className="link">
          <Link to={"all"}>See all</Link>
        </button>
      </article>

      <ExpensesList limit={4} />
    </section>
  )
}

export default ExpensesHistory
