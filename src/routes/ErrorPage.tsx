import { useRouteError } from "react-router-dom"

interface RouteError extends Error {
  statusText?: string
  data?: unknown
}

export default function ErrorPage() {
  const error = useRouteError() as RouteError
  console.error(error)

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText}</i>
        <pre>{error.message || JSON.stringify(error.data)}</pre>
      </p>
    </div>
  )
}
