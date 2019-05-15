const connect = require('connect');
const serveStatic = require('serve-static');
const path = require('path');

const server = connect();

server.use(serveStatic(path.resolve(__dirname, '../')));

server.listen(3000);

const livereload = require('livereload');
const lrserver = livereload.createServer();
lrserver.watch([ path.resolve(__dirname, '../demo'), path.resolve(__dirname, '../lib/index.dev.js') ]);

function closeServerOnTermination(server) {
  const terminationSignals = [ 'SIGINT', 'SIGTERM' ];
  terminationSignals.forEach(signal => {
    process.on(signal, () => {
      server.close();
      process.exit();
    });
  });
}

closeServerOnTermination(lrserver);
