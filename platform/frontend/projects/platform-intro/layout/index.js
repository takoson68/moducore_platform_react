import { AppShell } from './AppShell.jsx'
import { CapabilitiesPage, OverviewPage, WorkflowPage } from './pages.jsx'

export function getProjectLayout() {
  return AppShell
}

export function getProjectPages() {
  return {
    overview: OverviewPage,
    capabilities: CapabilitiesPage,
    workflow: WorkflowPage
  }
}
