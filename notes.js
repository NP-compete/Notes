console.log('Starting notes.js');

const fs = require('fs');

var fetchNotes = () => {
  try {
    var noteString = fs.readFileSync('notes-data.json');
    return JSON.parse(noteString);
  } catch (e) {
    return [];
  }

};

var saveNotes = (notes) => {
  fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};

var addNote = (title, body) => {

  // initializing variables
  var notes = fetchNotes();
  var note = {
    title: title,
    body: body
  };

  //check for duplicate title, if found, append it to duplicateNotes
  var duplicateNotes = notes.filter((note) => note.title === title);

  //if duplicateNotes is empty i.e no duplicate exists, save it
  if (duplicateNotes.length === 0) {
    notes.push(note);
    saveNotes(notes);
    return note;
  }
};

var getAll = () => {
  return fetchNotes();
};

var getNote = (title) => {
  var notes = fetchNotes();
  var note = notes.filter((tempNote) => tempNote.title === title);
  return note[0];
};

var removeNote = (title) => {
  var notes = fetchNotes();
  //create tempNotes which filters through the notes array and saves all those whose title is different
  var tempNotes = notes.filter((note) => note.title !== title);
  saveNotes(tempNotes);

  return notes.length !== tempNotes.length
};

var logNote = (note) => {
  console.log("--");
  console.log("Title: ", note.title);
  console.log("Body: ", note.body);
}

module.exports = {
  addNote: addNote,
  getAll,
  getNote,
  removeNote,
  logNote
};
