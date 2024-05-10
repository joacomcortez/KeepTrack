import React, { useEffect, useState } from 'react'
import { FolderInt } from '../../types/folder'
import { TodoInt } from '../../types/todo'
import { error } from 'console'
import { getTodos } from '../../User/userService'
import { useSessionUser } from '../../Store/userStore'
import Folder from '../../Components/Folder/Folder'
import Todo from '../../Components/Todo/Todo'
import Navbar from '../../Components/Navbar/Navbar'

function Home() {
   const user = useSessionUser()
   const [folders, setFolders] = useState<FolderInt[]>([])

   useEffect(() => {
      if (user?.id) {
         fetchFolders(user.id)
      }
   }, [])

   const fetchFolders = async (id: number) => {
      try {
         const folders = await getTodos(id)

         setFolders(folders)
      } catch (err) {
         console.error('Error fetching folders:', err)
      }
   }

   return (
      <>
         <Navbar />
         <div>
            <h1>My Folders</h1>
            {folders.length > 0 ? (
               folders.map((folder) => (
                  <div key={folder.id}>
                     <Folder folder={folder} />
                     <div>
                        {folder.todos.map((todos) => (
                           <Todo key={todos.id} todo={todos} />
                        ))}
                     </div>
                  </div>
               ))
            ) : (
               <p>No folders found.</p>
            )}
         </div>
      </>
   )
}

export default Home
