
var psqlConnection = process.env.DB_CONNECTION ? JSON.parse(process.env.DB_CONNECTION) : {};

var config = {
  host: psqlConnection.host || 'localhost',
  database: psqlConnection.db_name || 'midas',
  user: psqlConnection.username || 'midas',
  password: psqlConnection.password || 'midas',
  port: psqlConnection.port || '5432',
};
  
module.exports.dbConfig = config;