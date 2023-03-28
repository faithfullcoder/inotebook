import React, { useContext ,useState} from 'react'
import NotesContext from '../Context/notes/Notescontext'

export default function UpdateNote(props) {
    const context =useContext(NotesContext)
    const {UpdateNote} =context;
    const[note,setnote]=useState({"title":" ","description":" ","tag":" "})
    const onchange=(e)=>{
        setnote({...note,[e.target.name]:e.target.value})
    }
    
  return (
    <div>
        <h1>Update Note</h1>
    <form>
      <div className="form-group row">
    <label htmlFor="title" className="col-sm-2 col-form-label my-2">title</label>
    <div className="col-sm-10">
      <input type="text" className="form-control" id="title" placeholder="title" name="title" onChange={onchange}/>
    </div>
  </div>
  <div className="form-group row">
    <label htmlFor="description" className="col-sm-2 col-form-label">description</label>
    <div className="col-sm-10">
      <input type="text" className="form-control" id="description" placeholder="description" name="description" onChange={onchange}/>
    </div>
    </div>
    <div className="form-group row">
    <label htmlFor="tag" className="col-sm-2 col-form-label">tag</label>
    <div className="col-sm-10 my-3">
      <input type="text" className="form-control" id="tag" placeholder="tag" name="tag" onChange={onchange}/>
    </div>
  </div>
  <div className="form-group row">
    <div className="col-sm-10 my-2 mx-4">
      <button type="submit" className="btn btn-primary mx-4 my-2" onClick={UpdateNote()}>Add Note</button>
    </div>
  </div>
  </form>
    </div>
  )
}
