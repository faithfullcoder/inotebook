import React, { useContext, useEffect, useRef, useState } from "react";
import NotesContext from "../Context/notes/Notescontext";
import NoteItem from "./NoteItem";

export default function AllNotes() {
  const context = useContext(NotesContext);
  const { Notes ,getNotes ,updateNote} = context;
  useEffect(()=>{
    getNotes()
  })
  const[currentnote,setcurrentnote]=useState({"_id":" ","utitle":" ","udescription":" ","utag":" "})
const onchange=(e)=>{
    setcurrentnote({...currentnote,[e.target.name]:e.target.value})
}
  const ref =useRef(null);
  const closeref=useRef(null)
   const updatenote=(note)=>{
    ref.current.click();
    setcurrentnote({_id:note._id,utilte:note.title,udescription:note.description,utag:note.tag});
    console.log(note._id)
  }
  

const handleClick=(e)=>{
  console.log({id:currentnote._id,utilte:currentnote.utitle,udescription:currentnote.udescription,utag:currentnote.utag})
  updateNote(currentnote._id,currentnote.utitle,currentnote.udescription,currentnote.utag);
  setcurrentnote({"_id":" ","utitle":" ","udescription":" ","utag":" "})
  closeref.current.click();
 
}
  return (
    <>
<button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>


<div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Update Note</h5>
        <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
      <form>
      <div className="form-group row">
    <label htmlFor="title" className="col-sm-2 col-form-label my-2">title</label>
    <div className="col-sm-10">
      <input type="text" className="form-control" id="utitle" placeholder="title" name="utitle" value={currentnote.title} onChange={onchange}/>
    </div>
  </div>
  <div className="form-group row">
    <label htmlFor="description" className="col-sm-2 col-form-label">description</label>
    <div className="col-sm-10">
      <input type="text" className="form-control" id="udescription" placeholder="description" name="udescription" onChange={onchange}/>
    </div>
    </div>
    <div className="form-group row">
    <label htmlFor="tag" className="col-sm-2 col-form-label">tag</label>
    <div className="col-sm-10 my-3">
      <input type="text" className="form-control" id="tag" placeholder="tag" name="tag" onChange={onchange}/>
    </div>
  </div>
  <div className="form-group row">
    
  </div>
  </form>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary"  ref={closeref} data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
      </div>
    </div>
  </div>
</div>
    <div className="row my-5">
      <h2>Your Notes</h2>
      {Notes.map((note) => {
        return <NoteItem note={note} updatenote={updatenote} key={note._id} />;
      })}
    </div>
    </>
  );
}
