const { addNoteHandler } = require('./handler').default;

// membuat routing yang berisi array
const routes = [
  {
    method: 'POST',
    path: '/notes',
    handler: addNoteHandler,
  },
];

// expoet module route
module.exports = routes;
