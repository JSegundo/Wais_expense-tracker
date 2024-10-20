import "./styles/css/style.css"
import Home from "./routes/Home"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import RootLayout from "./routes/RootLayout"
import ErrorPage from "./routes/ErrorPage"
import AllTransactions from "./routes/AllTransactions"
import { ProtectedRoute } from "./components/ProtectedRoute"
import Login from "./routes/Login"

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "all",
        element: (
          <ProtectedRoute>
            <AllTransactions />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
