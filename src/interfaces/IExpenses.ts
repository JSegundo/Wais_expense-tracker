export interface IExpense {
  id: number
  amount: number
  category: Category
  date: string
  type: "in" | "out" // (income or expense)
}

export type Category =
  | "Salary"
  | "Food"
  | "Transportation"
  | "Entertainment"
  | "Utilities"
  | "Others"

export const categories: Category[] = [
  "Salary",
  "Food",
  "Transportation",
  "Entertainment",
  "Utilities",
  "Others",
]
