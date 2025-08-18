import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/forfait/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authenticated/forfait/"!</div>
}
