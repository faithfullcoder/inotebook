import React, { useContext } from "react";
import NotesContext from "../Context/notes/Notescontext";

export default function NoteItem(props) {
  const context=useContext(NotesContext)
  const {deleteNote}=context
  
  return (
    <div className="col-md-3">
      <div className="card my-4">
        <div className="card-body">
          <h5 className="card-title">{props.note.title}</h5>
          <p className="card-text">{props.note.description}</p>
          <i className="fa-solid fa-trash" style={{"cursor":"pointer"}} onClick={()=>{deleteNote(props.note._id)}}></i>
          <i className="fa-solid fa-pen-to-square mx-2" style={{"cursor":"pointer"}} onClick={()=>{props.updatenote(props.note)}}></i>
        </div>
      </div>
    </div>
  );
}
