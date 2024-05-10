import React, { Dispatch, SetStateAction } from 'react'
import { createContext, useContext, useState } from 'react'
import { User } from '../types/user'

type AuthContextStore = {
   user?: User
   token: String
   setUser: Dispatch<SetStateAction<User | undefined>>
   setToken: Dispatch<SetStateAction<String>>
}

const AuthContext = createContext<AuthContextStore | null>(null)

type ProviderProps = {
   children: React.ReactNode
}

export const AuthProvider = ({ children }: ProviderProps) => {
   const [user, setUser] = useState<User>()
   const [token, setToken] = useState<String>('')

   const store: AuthContextStore = {
      user,
      token,
      setUser,
      setToken,
   }

   return <AuthContext.Provider value={store}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
   const authContext = useContext(AuthContext)

   if (!authContext) {
      throw new Error('No se puede acceder al contexto')
   }

   return authContext
}