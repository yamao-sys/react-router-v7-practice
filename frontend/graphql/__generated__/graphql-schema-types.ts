export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = {
  [_ in K]?: never
}
export type Incremental<T> =
  | T
  | { [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string }
  String: { input: string; output: string }
  Boolean: { input: boolean; output: boolean }
  Int: { input: number; output: number }
  Float: { input: number; output: number }
  DateTime: { input: any; output: any }
}

export type CheckSignedInResponse = {
  __typename?: "CheckSignedInResponse"
  isSignedIn: Scalars["Boolean"]["output"]
}

export type CreateTodoInput = {
  content: Scalars["String"]["input"]
  title: Scalars["String"]["input"]
}

export type CreateTodoResponse = {
  __typename?: "CreateTodoResponse"
  id: Scalars["ID"]["output"]
  validationErrors: CreateTodoValidationError
}

export type CreateTodoValidationError = {
  __typename?: "CreateTodoValidationError"
  content: Array<Scalars["String"]["output"]>
  title: Array<Scalars["String"]["output"]>
}

export type Mutation = {
  __typename?: "Mutation"
  createTodo: CreateTodoResponse
  deleteTodo: Scalars["ID"]["output"]
  signIn: SignInResponse
  signUp: SignUpResponse
  updateTodo: UpdateTodoResponse
}

export type MutationCreateTodoArgs = {
  input: CreateTodoInput
}

export type MutationDeleteTodoArgs = {
  id: Scalars["ID"]["input"]
}

export type MutationSignInArgs = {
  input: SignInInput
}

export type MutationSignUpArgs = {
  input: SignUpInput
}

export type MutationUpdateTodoArgs = {
  id: Scalars["ID"]["input"]
  input: UpdateTodoInput
}

export type Query = {
  __typename?: "Query"
  checkSignedIn: CheckSignedInResponse
  fetchTodo: Todo
  fetchTodoLists: Array<Todo>
  user: User
}

export type QueryFetchTodoArgs = {
  id: Scalars["ID"]["input"]
}

export type SignInInput = {
  email: Scalars["String"]["input"]
  password: Scalars["String"]["input"]
}

export type SignInResponse = {
  __typename?: "SignInResponse"
  token: Scalars["String"]["output"]
  validationError: Scalars["String"]["output"]
}

export type SignUpInput = {
  email: Scalars["String"]["input"]
  name: Scalars["String"]["input"]
  password: Scalars["String"]["input"]
}

export type SignUpResponse = {
  __typename?: "SignUpResponse"
  user: User
  validationErrors: SignUpValidationError
}

export type SignUpValidationError = {
  __typename?: "SignUpValidationError"
  email: Array<Scalars["String"]["output"]>
  name: Array<Scalars["String"]["output"]>
  password: Array<Scalars["String"]["output"]>
}

export type Todo = {
  __typename?: "Todo"
  content: Scalars["String"]["output"]
  createdAt: Scalars["DateTime"]["output"]
  id: Scalars["ID"]["output"]
  title: Scalars["String"]["output"]
  updatedAt: Scalars["DateTime"]["output"]
  user: User
}

export type UpdateTodoInput = {
  content: Scalars["String"]["input"]
  title: Scalars["String"]["input"]
}

export type UpdateTodoResponse = {
  __typename?: "UpdateTodoResponse"
  id: Scalars["ID"]["output"]
  validationErrors: UpdateTodoValidationError
}

export type UpdateTodoValidationError = {
  __typename?: "UpdateTodoValidationError"
  content: Array<Scalars["String"]["output"]>
  title: Array<Scalars["String"]["output"]>
}

export type User = {
  __typename?: "User"
  createdAt: Scalars["DateTime"]["output"]
  email: Scalars["String"]["output"]
  id: Scalars["ID"]["output"]
  name: Scalars["String"]["output"]
  nameAndEmail: Scalars["String"]["output"]
  updatedAt: Scalars["DateTime"]["output"]
}
