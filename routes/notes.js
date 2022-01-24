const notes = require('express').Router();
const { readDataFile, readCopyAppend, } = require('../helpers/fsUtils');
const { v4: uuidv4 } = require('uuid');

notes.get('/', (req, res) => {
    readDataFile('./db/notes.json').then((data) => res.json(JSON.parse(data)));
});

notes.post('/', (req, res) => {
    console.log(req.body);

    const { title, text } = req.body;

    if (req.body) {
        const newNote = {
            title,
            text,
            id: uuidv4()
        };

        readCopyAppend(newNote, './db/notes.json');
        res.json(`Note added successfully!`);
    } else {
        res.error(`Error in adding note!`);
    }
});

// notes.delete('/', (req, res) => {
//     deleteDataFile('./db/notes.json/${id}').then((data) => res.json(JSON.parse(data)));
// });

module.exports = notes;