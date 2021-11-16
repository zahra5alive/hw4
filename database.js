var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "12345678",
  database: "hw4"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

/*
const{createPool} = require('mysql')

const pool = createPool({
  host: "localhost",
  user: "root",
  password: "12345678"
})

pool.query('SELECT * FROM hw4.students', (err, res)=>{
  return console.log(res)
})
*/
