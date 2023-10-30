/* eslint-disable no-console */

// membuat web server menggunakan hapi
const Hapi = require('@hapi/hapi');
const routes = require('./routes');

const init = async () => {
  const server = Hapi.server({
    port: 5000,
    host: 'localhost',
  });

  // menjalankan routing
  server.route(routes);

  await server.start();
  console.log(`Server sedang berjalan pada ${server.info.uri}`);
};

init();
