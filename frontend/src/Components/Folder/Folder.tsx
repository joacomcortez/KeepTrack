import React from 'react'
import './folder.css'
import { FolderInt } from '../../types/folder'

interface Props {
   folder: FolderInt
}

function Folder(props: Props) {
   console.log('Folder Component - Folder Props:', props)

   return <div>{props.folder.title}</div>
}

export default Folder
