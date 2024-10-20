import { FaArrowCircleDown } from "react-icons/fa"
import { FaCircleArrowUp } from "react-icons/fa6"
import { MdOutlineEdit } from "react-icons/md"
import { IExpense } from "../../interfaces/IExpenses"
import React from "react"
import ModalEditExpense from "./Modal"
import { useLocalStorage } from "usehooks-ts"

export interface IExpenseListProps {
  expenses: IExpense[]
  showEdit?: boolean
  limit?: number
}
export default function ExpensesList({
  expenses,
  showEdit = false,
  limit = 0,
}: IExpenseListProps) {
  const [, setLocalStorageExpenses] = useLocalStorage<IExpense[]>(
    "expenses",
    []
  )
  const [modalIsOpen, setIsOpen] = React.useState(false)
  const [expenseToEdit, setExpenseToEdit] = React.useState<IExpense | null>(
    null
  )

  // Conditionally slice the expenses array based on the limit prop
  // Used to just show the last 5 in the home
  const displayedExpenses = limit > 0 ? expenses.slice(0, limit) : expenses
  if (displayedExpenses.length < 1) {
    return <h1 className="muted">No entries avaliable</h1>
  }

  const handleEditExpense = (expense: IExpense) => {
    setExpenseToEdit(expense)
    setIsOpen(true)
  }

  //function that the expensesForm in the Modal will execute to update expense
  const updateExpense = (updatedExpense: IExpense) => {
    const newExpenses = expenses.map((storedExpense) =>
      storedExpense.id === updatedExpense.id ? updatedExpense : storedExpense
    )
    setLocalStorageExpenses(newExpenses)
    setIsOpen(false)
  }

  return (
    <>
      <ul className="expenses-list">
        {displayedExpenses.map((exp) => (
          <li className="item" key={exp.id}>
            <section>
              {exp.type === "in" ? (
                <FaCircleArrowUp size={40} />
              ) : (
                <FaArrowCircleDown size={40} />
              )}
              <article className="col start">
                <h5 className="category">{exp.category}</h5>
                <span className="type">{exp.type}</span>
              </article>
            </section>

            <section className="action-section">
              <article className="col">
                <h5 className={`amount ${exp.type}`}>
                  {exp.type === "in" ? "+ " : "- "}
                  {exp.amount}
                </h5>
                <span>{exp.date}</span>
              </article>

              {/* Conditionally render the edit icon based on showEdit prop */}
              {showEdit && (
                <div className="icon-container">
                  <button onClick={() => handleEditExpense(exp)}>
                    <MdOutlineEdit size={24} />
                  </button>
                </div>
              )}
            </section>
          </li>
        ))}
      </ul>
      <ModalEditExpense
        modalIsOpen={modalIsOpen}
        setIsOpen={setIsOpen}
        onSubmit={updateExpense}
        initialExpense={expenseToEdit}
      />
    </>
  )
}
