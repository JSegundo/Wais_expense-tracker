export interface Expense {
  id: number
  amount: number
  category: Category
  description: string
  type: "in" | "out" // (income or expense)
}

export type Category =
  | "Food"
  | "Transportation"
  | "Entertainment"
  | "Utilities"
  | "Others"
