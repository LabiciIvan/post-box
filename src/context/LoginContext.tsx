import { createContext, useState } from "react";

interface UserLoginType {
  emailLogin: string,
  passwordLogin: string,
  handleEmail: (email: string) => void,
  handlePassword: (pwd: string) => void,
}


const LoginContext = createContext<UserLoginType>({
  emailLogin: '',
  passwordLogin: '',
  handleEmail: (email: string) => {},
  handlePassword: (pwd: string) => {},
});


const LoginProvider = ({children} : {children: React.ReactNode}): React.ReactNode => {

  const [emailLogin, setEmailLogin] = useState<string>('');

  const [passwordLogin, setPasswordLogin] = useState<string>('');

  const handleEmail = (email: string) => {
    setEmailLogin(() => email)
  }

  const handlePassword = (pwd: string) => {
    setPasswordLogin(() => pwd)
  }

  return (
    <LoginContext.Provider value={{ emailLogin, passwordLogin, handleEmail, handlePassword }}>
      {children}
    </LoginContext.Provider>
  )
}


export default LoginProvider;

export {
  LoginContext
}