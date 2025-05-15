import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './app.css';

const backendURL = 'http://localhost:5000/api';

function App() {
  const [userId, setUserId] = useState(localStorage.getItem('userId'));
  const [inputUserId, setInputUserId] = useState('');
  const [text, setText] = useState('');
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    if (!userId) return;
    axios.get(`${backendURL}/notes/${userId}`).then(res => setNotes(res.data));
  }, [userId]);

  const createUser = async () => {
    const res = await axios.get(`${backendURL}/new-user`);
    localStorage.setItem('userId', res.data.userId);
    setUserId(res.data.userId);
  };

  const useExistingUser = () => {
    if (inputUserId.trim() === '') return;
    localStorage.setItem('userId', inputUserId.trim());
    setUserId(inputUserId.trim());
  };

  const addNote = async () => {
    if (!text.trim()) return;
    await axios.post(`${backendURL}/notes`, { userId, text });
    setText('');
    const res = await axios.get(`${backendURL}/notes/${userId}`);
    setNotes(res.data);
  };

  if (!userId) {
    return (
      <div className="container">
        <h1>Welcome to Notes App</h1>
        <div style={{ marginBottom: '1em' }}>
          <p>Already have a User ID?</p>
          <input
            type="text"
            placeholder="Enter your User ID"
            value={inputUserId}
            onChange={(e) => setInputUserId(e.target.value)}
          />
          <button onClick={useExistingUser}>Use Existing ID</button>
        </div>
        <p>Or create a new one:</p>
        <button onClick={createUser}>Create New User</button>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Your Notes</h1>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write your note here..."
      />
      <br />
      <button onClick={addNote}>Add Note</button>
      <ul>
        {notes.map(note => (
          <li key={note._id}>{note.text}</li>
        ))}
      </ul>
      <p className="user-id">
        <strong>Your User ID:</strong> <code>{userId}</code><br />
        (Save this somewhere! You'll need it to access your notes later.)
      </p>
    </div>
  );
}

export default App;
