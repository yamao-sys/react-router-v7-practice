import { createContext, FC, useContext, useState } from "react"

type AuthSetContextType = {
  setAuth: React.Dispatch<React.SetStateAction<AuthContextType>>
}

type AuthContextType = {
  userName: string
}

export const AuthContext = createContext<AuthContextType>({ userName: "" })

export const AuthSetContext = createContext<AuthSetContextType>({ setAuth: () => undefined })

export const useAuthContext = () => useContext<AuthContextType>(AuthContext)

export const useAuthSetContext = () => useContext<AuthSetContextType>(AuthSetContext)

export const AuthProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [auth, setAuth] = useState<AuthContextType>({ userName: "" })

  return (
    <AuthContext.Provider value={auth}>
      <AuthSetContext.Provider value={{ setAuth }}>{children}</AuthSetContext.Provider>
    </AuthContext.Provider>
  )
}
