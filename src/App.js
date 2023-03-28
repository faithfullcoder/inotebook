import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from './Components/About';
import Alert from "./Components/Alert";
import Home from './Components/Home';
import Navbar from './Components/Navbar';
import NoteState from "./Context/notes/NotesState";

function App() {
  return (
    <>

    <BrowserRouter>
    <NoteState>
    <Navbar/>
    <Alert message="it is arbaj"/>
    <Routes>
     <Route exact path="/" element={<Home />} />
      <Route exact path="/about" element={<About />} />
      </Routes>
      </NoteState>
      </BrowserRouter>
      
    </>
  );
}

export default App;
