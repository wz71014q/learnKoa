const mysql = require('mysql')

const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'wz2131q',
  database: 'database',
});
connection.connect();

connection.query('SELECT * FROM my_table',  (error, results, fields) => {
  if (error) throw error
  console.log(results)
});
connection.end();