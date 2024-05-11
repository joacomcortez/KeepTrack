import { Subject } from 'rxjs'
import { useState, useLayoutEffect } from 'react'
import { User } from '../User/userService'

let currentUser: User | undefined

const userSubject = new Subject<User | undefined>()

const storedUser = localStorage.getItem('currentUser')
if (storedUser) {
   currentUser = JSON.parse(storedUser)
}

export function useSessionUser() {
   const [user, setUser] = useState(currentUser)

   useLayoutEffect(() => {
      userSubject.subscribe((newState: any) => {
         setUser(newState)
      })
   }, [])

   return user
}

export function updateSessionUser(user: User) {
   currentUser = user
   localStorage.setItem('currentUser', JSON.stringify(user)) // Persist user information in localStorage
   userSubject.next(currentUser)
}

export function cleanupSessionUser() {
   currentUser = undefined
   localStorage.removeItem('currentUser') // Remove user information from localStorage
   userSubject.next(currentUser)
}
