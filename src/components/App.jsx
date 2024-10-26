import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import Note from './Note';
import CreateArea from './CreateArea';

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await axios.get('http://localhost:3000/notes');
      setNotes(response.data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const addNote = async (newNote) => {
    try {
      const { title, content } = newNote;
      const eventId = 1;
      
      const response = await axios.post('http://localhost:3000/notes', { eventId, name: title, task: content });
      

      fetchNotes();
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };


  const deleteNote = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/notes/${id}`);
      fetchNotes(); 
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem) => (
        <Note
          key={noteItem.id} 
          id={noteItem.id} 
          title={noteItem.name} 
          content={noteItem.task} 
          onDelete={deleteNote} 
        />
      ))}
    </div>
  );
}

export default App;







// import React, { useState } from 'react';
// import Header from './Header';
// import Note from './Note';
// import CreateArea from './CreateArea';

// function App() {

//   const [notes, setNotes] = useState([]);

//   function addNote(newNote) {
//     setNotes(prevNotes => {
//       return [...prevNotes, newNote];
//     });
//   }

//   function deleteNote(id) {
//     setNotes(prevNotes => {
//       return prevNotes.filter((noteItem, index) => {
//         return index !== id;
//       });
//     });
//   }

//   return (
//     <div>
//       <Header />
//       <CreateArea onAdd={addNote} />
//       {notes.map((noteItem, index) => {
//         return (
//           <Note
//             key={index}
//             id={index}
//             title={noteItem.title}
//             content={noteItem.content}
//             onDelete={deleteNote}
//           />
//         );
//       })}
//     </div>
//   );
// }

// export default App;
