import { createFileRoute } from '@tanstack/react-router'
import PlanningPage from './planning/index'

export const Route = createFileRoute('/_authenticated/admin/planning')({
  component: PlanningPage,
})
