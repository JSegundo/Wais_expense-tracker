import { FaArrowCircleDown } from "react-icons/fa"
import { FaCircleArrowUp } from "react-icons/fa6"
import { MdOutlineEdit } from "react-icons/md"
import { IExpense } from "../../../interfaces/IExpenses"
import React from "react"
import ModalEditExpense from "../Modal"
import { useLocalStorage } from "usehooks-ts"
import { motion } from "framer-motion"
import { itemVariants } from "../../../utils/motionVariants"
import styles from "./ExpensesList.module.scss"

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

  // Editing funtionality
  const [modalIsOpen, setModalOpen] = React.useState(false)
  const [expenseToEdit, setExpenseToEdit] = React.useState<IExpense | null>(
    null
  )
  //function that the expensesForm in the Modal will execute to update expense
  const updateExpense = (updatedExpense: IExpense) => {
    const newExpenses = expenses.map((storedExpense) =>
      storedExpense.id === updatedExpense.id ? updatedExpense : storedExpense
    )
    setLocalStorageExpenses(newExpenses)
    setModalOpen(false)
  }

  const handleEditExpense = (expense: IExpense) => {
    setExpenseToEdit(expense)
    setModalOpen(true)
  }

  // Conditionally slice the expenses array based on the limit prop
  // Used to just show the last 5 in the home
  const displayedExpenses = limit > 0 ? expenses.slice(0, limit) : expenses
  if (displayedExpenses.length < 1) {
    return <motion.h1 className="muted">No entries avaliable</motion.h1>
  }

  return (
    <>
      <ul className="expenses-list">
        {displayedExpenses.map((exp) => (
          <motion.li
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={styles.item}
            key={exp.id}
          >
            <section className={styles.itemSection}>
              {exp.type === "in" ? (
                <FaCircleArrowUp size={40} />
              ) : (
                <FaArrowCircleDown size={40} />
              )}
              <article className={`${styles.col} `}>
                <h5>{exp.category}</h5>
                <span>{exp.type}</span>
              </article>
            </section>

            <section className={styles.actionSection}>
              <article className={styles.col}>
                <h5
                  className={`${styles.amount} ${
                    exp.type === "in" ? styles.amountIn : ""
                  }`}
                >
                  {exp.type === "in" ? "+ " : "- "}
                  {exp.amount}
                </h5>
                <span>{exp.date}</span>
              </article>

              {showEdit && (
                <div className={styles.iconContainer}>
                  <button onClick={() => handleEditExpense(exp)}>
                    <MdOutlineEdit size={24} />
                  </button>
                </div>
              )}
            </section>
          </motion.li>
        ))}
      </ul>
      <ModalEditExpense
        modalIsOpen={modalIsOpen}
        setIsOpen={setModalOpen}
        onSubmit={updateExpense}
        initialExpense={expenseToEdit}
      />
    </>
  )
}
