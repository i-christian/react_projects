import {
  type _Task,
  type AuthenticatedAction,
  type Payload,
} from 'wasp/server/_types'

// PUBLIC API
export type CreateTask<Input extends Payload = never, Output extends Payload = Payload> = 
  AuthenticatedAction<
    [
      _Task,
    ],
    Input,
    Output
  >

// PUBLIC API
export type UpdateTask<Input extends Payload = never, Output extends Payload = Payload> = 
  AuthenticatedAction<
    [
      _Task,
    ],
    Input,
    Output
  >

