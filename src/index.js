const http = require('http');
const app = require('./config/express');
const database = require('./config/database');

database.connect();

const port = process.env.PORT || 8086;

const server = http.createServer(app);

server.listen(port, () => console.log(`Server is listening on port :${port}`));