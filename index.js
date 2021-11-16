var express = require('express');
var app     = express();


app.listen(3000, function(){
   console.log('Running on port 3000!')
});

const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '12345678',
  database: 'hw4'
});
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
});


app.use(express.static('public'));


app.get('/add', function(req, res){
   console.log('Adding to student database!');
   console.log(req.query);
   console.log(`INSERT INTO \`students\` (\`FirstName\` , \`Last Name\` , \`Phone Number\` , \`Email\`, \`University\`, \`Major\`) VALUES('${req.query.firstName}', '${req.query.lastName}', '${req.query.phoneNumber}', '${req.query.email}', '${req.query.university}', '${req.query.major}')`);
      connection.query(
      `INSERT INTO \`students\` (\`FirstName\` , \`Last Name\` , \`Phone Number\` , \`Email\`, \`University\`, \`Major\`) VALUES('${req.query.firstName}', '${req.query.lastName}', '${req.query.phoneNumber}', '${req.query.email}', '${req.query.university}', '${req.query.major}')`,
      function(err, results, fields) {
        console.log(results);
        res.send(results);
      }
    );
});

app.get('/random', function(req, res){
  connection.query(
      'SELECT * FROM `students`',
      function(err, results, fields) {
        console.log(results);
        const length=results.length;
        const index = Math.floor(Math.random() * length);
        res.send(results[index]);
      }
    );
});

/* app.get('/random', function(req, res){
    console.log('Adding to database!');
    console.log(req.query);
    let firstNames = ['Peter', 'Bruce', 'Diana'];
    let lastNames = ['Parker', 'Wayne', 'Prince'];
    let emails = ['peter@mit.edu', 'bruce@bu.edu', 'diana@bc.edu'];
    let phoneNumber = ['1111', '2222', '3333', '4444'];
    let university = ['MIT', 'BU', 'BC'];
    let major = ['Mech Engr', 'Business', 'Biology'];

    var firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    var lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    var email = emails[Math.floor(Math.random() * emails.length)];

    connection.query(
       `INSERT INTO \`students\` VALUES('${firstName}', '${lastName}', '${phoneNumber}', '${email}', '${university}', '${major}')`,
       function(err, results, fields) {
         console.log(results);
         res.send(results);
       }
     );
 });
*/

app.get('/read', function(req, res){
    connection.query(
        'SELECT * FROM `students`',
        function(err, results, fields) {
          console.log(results);
          res.send(results);
        }
      );
 });
