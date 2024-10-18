import React from "react"
import { Expense } from "../interfaces/IExpenses"
export interface ExpenseHistoryProps {
  expenses: Expense[] // List of expenses to display
}
const ExpensesHistory = ({ expenses }: ExpenseHistoryProps) => {
  return (
    <section className="">
      <article>
        <div>
          <h1>Transactions</h1>
          <button className="link">See all</button>
        </div>
        <p>filters:</p>
      </article>

      <div className="box">
        <ul>
          {expenses.map((exp) => (
            <li key={exp.id}>
              {exp.amount} - {exp.category} - {exp.description} ({exp.type})
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default ExpensesHistory
