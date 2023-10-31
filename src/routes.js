const { addNoteHandler, getAllNotesHandler, getNoteByIdHandler } = require('./handler');

// membuat routing yang berisi array
const routes = [
  {
    // ini untuk membuat note baru
    method: 'POST',
    path: '/notes',
    handler: addNoteHandler,
  },

  {
    // ini untuk menampilkan seluruh note
    method: 'GET',
    path: '/notes',
    handler: getAllNotesHandler,
  },

  {
    // menampilkan atau mengambil note secara detail dengan id
    method: 'GET',
    path: '/notes/{id}',
    handler: getNoteByIdHandler,
  }
];

// export module route
module.exports = routes;
