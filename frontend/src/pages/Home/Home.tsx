import React, { useEffect, useState } from 'react'
import { FolderInt } from '../../types/folder'
import { getTodos, createFolder } from '../../User/userService'
import { useSessionUser } from '../../Store/userStore'
import Folder from '../../Components/Folder/Folder'
import Navbar from '../../Components/Navbar/Navbar'
import './home.css'
import AddIcon from '@mui/icons-material/Add'
import TextField from '@mui/material/TextField'

function Home() {
   const user = useSessionUser()
   const [folders, setFolders] = useState<FolderInt[]>([])
   const [showNewFolderPopup, setShowNewFolderPopup] = useState(false)
   const [newFolderTitle, setNewFolderTitle] = useState('')

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

   const handleAdd = () => {
      setShowNewFolderPopup(true)
   }

   const handleClosePopup = () => {
      setShowNewFolderPopup(false)
      setNewFolderTitle('')
   }

   const handleNewFolderSubmit = async (userId: number | undefined, e: React.FormEvent) => {
      if (!userId) {
         return
      }

      if (newFolderTitle.trim() === '') {
         return
      }

      e.preventDefault()
      try {
         const newFolder = await createFolder(userId, newFolderTitle)
         setFolders([newFolder, ...folders])
         setShowNewFolderPopup(false)
         setNewFolderTitle('')
      } catch (err) {
         console.error('Error creating folder:', err)
      }
   }

   const handleNewFolderTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setNewFolderTitle(e.target.value)
   }

   const updateFolder = (updatedFolder: FolderInt) => {
      const updatedFolderId = updatedFolder.id

      setFolders((prevFolders) => {
         return prevFolders.map((folder) => {
            if (folder.id === updatedFolderId) {
               return updatedFolder
            }
            return folder
         })
      })
   }
   return (
      <>
         <Navbar />
         <div className="folders">
            <h1>My Folders</h1>
            <div className="addFolder">
               <div className="text">Wish to add any new folders?</div>
               <div className="addButton" onClick={handleAdd}>
                  <AddIcon />
               </div>
            </div>
            {showNewFolderPopup && (
               <div className="popup">
                  <div>
                     <form className="popupContent" onSubmit={(e) => handleNewFolderSubmit(user?.id, e)}>
                        <TextField
                           className="newTitle"
                           value={newFolderTitle}
                           onChange={handleNewFolderTitleChange}
                           id="standard-basic"
                           label="Enter folder title"
                           variant="standard"
                        />
                        <div className="popupButtons">
                           <button onClick={handleClosePopup}>Cancel</button>

                           <button type="submit">Create Folder</button>
                        </div>
                     </form>
                  </div>
               </div>
            )}
            {folders.length > 0 ? (
               folders.map((folder) => (
                  <div key={folder.id}>
                     <Folder folder={folder} updateFolder={updateFolder} key={folder.id} />
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
