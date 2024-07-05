import { createQuery } from './core'
import { GetTasks } from 'wasp/server/operations/queries'

// PUBLIC API
export const getTasks = createQuery<GetTasks>(
  'operations/get-tasks',
  ['Task'],
)

// PRIVATE API
export { addMetadataToQuery } from './core'
