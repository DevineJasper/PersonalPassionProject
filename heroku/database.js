const mysql = require("mysql");
const con = mysql.createConnection({
  // socketPath: "/Applications/MAMP/tmp/mysql/mysql.sock",
  host: "ID276017_cinematjes.db.webhosting.be",
  user: "ID276017_cinematjes",
  password: "JHcomm@19",
  database: "ID276017_cinematjes"
});

con.connect(err => {
  if (err) throw err;
  console.log("Connected!");
  con.query("SELECT * FROM `test-table`", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
});

// con.end((err) => {
//   // The connection is terminated gracefully
//   // Ensures all previously enqueued queries are still
//   // before sending a COM_QUIT packet to the MySQL server.
// });
