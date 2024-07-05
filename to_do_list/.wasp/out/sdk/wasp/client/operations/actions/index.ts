import { createAction } from './core'
import { CreateTask } from 'wasp/server/operations/actions'
import { UpdateTask } from 'wasp/server/operations/actions'

// PUBLIC API
export const createTask = createAction<CreateTask>(
  'operations/create-task',
  ['Task'],
)

// PUBLIC API
export const updateTask = createAction<UpdateTask>(
  'operations/update-task',
  ['Task'],
)
