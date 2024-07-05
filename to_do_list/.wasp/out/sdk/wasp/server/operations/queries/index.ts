import { prisma } from 'wasp/server'

import { getTasks as getTasks_ext } from 'wasp/ext-src/queries'

// PRIVATE API
export type GetTasks = typeof getTasks_ext 

// PUBLIC API
export const getTasks = async (args, context) => {
  return (getTasks_ext as any)(args, {
    ...context,
    entities: {
      Task: prisma.task,
    },
  })
}
