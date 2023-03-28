import { useState } from "react";
import NotesContext from "./Notescontext";

const NoteState = (props) => {
  const Host ="http://localhost:5000"
  
  let notes =[];
  const [Notes, setNotes] = useState(notes);
 //fteching all note
 const getNotes = async() => {
  //Api call
  const url = `${Host}/api/notes/ftechallnotes`
  const response = await fetch(
    url,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token" :"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQxNDRmNDY5ODI0MmMzMGYxNGIzYmNlIn0sImlhdCI6MTY3OTA1Mjc0Nn0.srokJgiJ4XmHbVN0akTFLh_ldPIAbX4DfmNrdDlZMAk"
      }
    })
   const json = await response.json();
   setNotes(json);
};
  // adiing a note
  const addNote = async(title,description,tag) => {
     //Api call
     const url = `${Host}/api/notes/createnote`
     const response = await fetch(
       url,
       {
         method: "POST",
         headers: {
           "Content-Type": "application/json",
           "auth-token" :"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQxNDRmNDY5ODI0MmMzMGYxNGIzYmNlIn0sImlhdCI6MTY3OTA1Mjc0Nn0.srokJgiJ4XmHbVN0akTFLh_ldPIAbX4DfmNrdDlZMAk"
         },
         body :JSON.stringify({title,description,tag}),
       })
       const json = await response.json()
       console.log(json);
  };
  //function for deleting  a note
  const deleteNote = async(id) => {
    const url = `${Host}/api/notes/deletenote/${id}`
    const response = await fetch(
      url,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token" :"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQxNDRmNDY5ODI0MmMzMGYxNGIzYmNlIn0sImlhdCI6MTY3OTA1Mjc0Nn0.srokJgiJ4XmHbVN0akTFLh_ldPIAbX4DfmNrdDlZMAk"
        }
      })
      const json = await response.json();
      console.log(json);
  };
  //function for updating a note
  const updateNote = async(id, title, description, tag) => {
    //Api call
    const url = `${Host}/api/notes/updatenote/${id}`
    const response = await fetch(
      url,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token" :"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQxNDRmNDY5ODI0MmMzMGYxNGIzYmNlIn0sImlhdCI6MTY3OTA1Mjc0Nn0.srokJgiJ4XmHbVN0akTFLh_ldPIAbX4DfmNrdDlZMAk"
        },
        body: JSON.stringify({title,description,tag}),
      })
      const json =response.json()
      console.log(json);
    //logic to edit in client 

    for (let i = 0; i < notes.length; i++) {
       if (notes[i]._id === id) {
         notes[i].title = title;
         notes[i].description = description;
        notes[i].tag = tag;
       }
     }
    }
  return (
    <NotesContext.Provider value={{ Notes, deleteNote, updateNote, addNote ,getNotes}}>
      {props.children}
    </NotesContext.Provider>
  );
};
export default NoteState;
