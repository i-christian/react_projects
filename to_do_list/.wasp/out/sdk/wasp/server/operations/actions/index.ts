import { prisma } from 'wasp/server'

import { createTask as createTask_ext } from 'wasp/ext-src/actions'
import { updateTask as updateTask_ext } from 'wasp/ext-src/actions'

// PRIVATE API
export type CreateTask = typeof createTask_ext 

// PUBLIC API
export const createTask = async (args, context) => {
  return (createTask_ext as any)(args, {
    ...context,
    entities: {
      Task: prisma.task,
    },
  })
}

// PRIVATE API
export type UpdateTask = typeof updateTask_ext 

// PUBLIC API
export const updateTask = async (args, context) => {
  return (updateTask_ext as any)(args, {
    ...context,
    entities: {
      Task: prisma.task,
    },
  })
}
