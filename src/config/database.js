const mongoose = require('mongoose');

let _db;
const connect = _ => {
  mongoose.connect(`mongodb://${process.env.DATABASE_USER || 'root'}:${process.env.DATABASE_PASSWORD || 'example'}@${process.env.DATABASE_URL || 'localhost'}:27017/cms?authSource=admin`, {
    useCreateIndex: true, 
    useUnifiedTopology: true,
    useNewUrlParser: true
  }).then(client => _db = client.connection);
};

const getDatabase = _ => {
  console.log('Getting db');
  if (_db) return _db;
};

module.exports = {
    connect,
    getDatabase
};