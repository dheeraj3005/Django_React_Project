import { useState,useEffect } from "react"
import api from "../api"
import Note from "../components/Note"
import "../styles/Home.css"



function Home(){
    const[notes, setNotes] = useState([]);
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("")

    useEffect(() => {
        getNote();
    }, [])

    const getNote = () => {
        api.get("/api/notes/").then((res) => res.data).then((data) => setNotes(data)).catch((err) => alert(error))
    }



const deleteNote = (id) => {
    api.delete(`/api/notes/delete/${id}/`).then((res) => {
        if(res.status ===204) alert("Note is Deleted")
            else alert("Failed to Delete, Check Again")
        getNote()
    }).catch((error) => alert(error))
    
};

const createNote = (e) => {
    e.preventDefault()
    api.post("/api/notes/", {content,title}).then((res) => {
        if(res.status ===201) alert("Note is Created")
            else alert("Failed to Create, Check Again")
        getNote();
    }).catch((error) => alert(error))
    
}

return (<div>
    <div>
    <h1>Notes</h1>
    {notes.map((note) => <Note note={note} onDelete={deleteNote} key={note.id}/>)}
    </div>

    <h2>Create a Note</h2>
    <form onSubmit={createNote}>
    <label htmlFor="title">Title:</label>
    <br/>
    <input type="text" id="title" name="title" required value={title} onChange={(e) => setTitle(e.target.value)} />
   
    <label htmlFor="content">Content:</label>
    <br/>
    <textarea id="content" name="content" value={content} required onChange={(e) => setContent(e.target.value)}
   ></textarea>
   <br/>
   <input type="submit" value="submit"></input>


   
   
    </form>
</div>
);
}
export default Home