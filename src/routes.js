const { addNoteHandler, getAllNotesHandler, getNoteByIdHandler, editNoteByIdHandler } = require('./handler');

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
  },

  {
    // route ini untuk mengubah catatan berdasarkan id
    method: 'PUT',
    path: '/notes/{id}',
    handler: editNoteByIdHandler,
  }
];

// export module route
module.exports = routes;
