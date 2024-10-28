import React from "react"
import Modal from "react-modal"
import ExpensesForm from "../ExpensesForm"
import { IExpense } from "../../../interfaces/IExpenses"
import { IoIosCloseCircleOutline } from "react-icons/io"
import styles from "./modal.module.scss"

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    zIndex: "1000",
    borderRadius: "16px",
  },
}
interface IMyModalProps {
  modalIsOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  onSubmit: (updatedExpense: IExpense) => void
  initialExpense: IExpense | null
}
const ModalEditExpense = ({
  modalIsOpen,
  setIsOpen,
  onSubmit,
  initialExpense,
}: IMyModalProps) => {
  function closeModal() {
    setIsOpen(false)
  }

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <header className={styles["modal-header"]}>
        <h2>Edit expense</h2>
        <button className="link" onClick={closeModal}>
          <IoIosCloseCircleOutline size={30} />
        </button>
      </header>

      <ExpensesForm initialExpense={initialExpense} onSubmit={onSubmit} />
    </Modal>
  )
}

export default ModalEditExpense
