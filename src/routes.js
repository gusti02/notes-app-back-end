const { addNoteHandler } = require('./handler');

// membuat routing yang berisi array
const routes = [
  {
    method: 'POST',
    path: '/notes',
    handler: addNoteHandler,
  },
];

// export module route
module.exports = routes;
