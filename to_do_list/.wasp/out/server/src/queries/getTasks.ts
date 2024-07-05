import { prisma } from 'wasp/server'

import { getTasks } from '../../../../../src/queries'


export default async function (args, context) {
  return (getTasks as any)(args, {
    ...context,
    entities: {
      Task: prisma.task,
    },
  })
}

export type GetTasks = typeof getTasks 
