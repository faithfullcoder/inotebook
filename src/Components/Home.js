import React from 'react'
import "../Styles/Home.css"
import AddNote from './AddNote'
import AllNotes from './AllNotes'

export default function Home() {
  
  return (
    <div className='container'>
    <AddNote/>
    <AllNotes/>
    </div>
  )
}
