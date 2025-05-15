const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://mongo:27017/notesapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const noteSchema = new mongoose.Schema({
  userId: String,
  text: String,
  createdAt: { type: Date, default: Date.now }
});
const Note = mongoose.model('Note', noteSchema);

app.post('/api/notes', async (req, res) => {
  const { userId, text } = req.body;
  const note = new Note({ userId, text });
  await note.save();
  res.json(note);
});

app.get('/api/notes/:userId', async (req, res) => {
  const notes = await Note.find({ userId: req.params.userId });
  res.json(notes);
});

app.get('/api/new-user', (req, res) => {
  res.json({ userId: uuidv4() });
});

app.listen(5000, () => console.log('Backend running on port 5000'));
