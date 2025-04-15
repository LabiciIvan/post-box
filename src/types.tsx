interface User {
  id: number,
  name: string,
  email: string,
  password: string,
  image: string,
  remeberLoggedIn: boolean,
  logoutAfter: string,
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
  emailRead: boolean,
  fontSize: string,
  fontType: FontTypes
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

type InboxTypeKeysString = 'inbox'| 'draft'| 'sent'| 'deleted';

type FontTypes = 'Nunito'|'Inter'|'Roboto'|'Lato'|'Open Sans'|'Montserrat'|'Source Sans Pro'|'Pacifico';

type ComposeOrDraftType = 'compose'|'draft';

interface FontInterface {
  fontSize: string,
  fontType: FontTypes,
  changeSize: (size: string) => void,
  changeType: (font: FontTypes) => void,
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

interface errorSearchType {
  message: string,
}

type SettingsActionTypes = 'changeTheme'|'language'|'contentLanguage'|'soundEffects'|'closeAccount'|'hibernateAccount'|'paymentMethods';

type NotificationsTypes = 'error' | 'success' | 'warning';

interface ProfileInterface {
  userID: number,
  firstName: string,
  lastName: string,
  userName: string,
  nickName: string,
  socialMedia: string,
  email: string,
  phone: string,
  address: string,
  biographicalInfo: string,
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
  CCType,
  errorSearchType,
  InboxTypeKeysString,
  FontTypes,
  FontInterface,
  ComposeOrDraftType,
  NotificationsTypes,
  SettingsActionTypes,
  ProfileInterface
}
