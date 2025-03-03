interface User {
  id: number,
  name: string,
  email: string,
  password: string,
  image: string,
}

interface UserAttemptingLogin {
  email: string,
  password: string
}

interface AuthContextType {
  user: User | false,
  login: (user: User) => void,
  logout: () => void,
}

interface UserNotFoundErrorType {
  email: string,
  password: string,
}

interface MailUser {
  id: number,
  name: string,
  email: string,
}

interface Email {
  id: string,
  timestamp: string,
  cc: CCType[],
  sender: MailUser,
  receiver: CCType[],
  title: string,
  message: string,
}

interface InboxType {
  belongsTo: number,
  inbox: Email[],
  draft: Email[],
  sent: Email[],
  deleted: Email[],
  results: Email[],
}

interface InboxTypeKeys {
  inbox: Email[],
  draft: Email[],
  sent: Email[],
  deleted: Email[],
  results: Email[],
}

interface GeneralFetchError {
  error: string,
}

interface SectionMenuType {
  view: keyof InboxTypeKeys | string,
  icon: React.ReactNode
}

interface SectionViewType {
  title: string,
  component: React.ReactNode,
}

interface ViewSectionContextType {
  title: keyof InboxTypeKeys
  selectView: (selectedView: keyof InboxTypeKeys) => void,
}

interface CCType {
  email: string,
}

export type {
  User,
  UserAttemptingLogin,
  AuthContextType,
  UserNotFoundErrorType,
  Email,
  InboxType,
  GeneralFetchError,
  MailUser,
  SectionMenuType,
  ViewSectionContextType,
  SectionViewType,
  InboxTypeKeys,
  CCType
}
