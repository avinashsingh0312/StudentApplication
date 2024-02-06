import express from "express";
import mysql from "mysql2";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Test_1234",
  database: "crud",
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL database");
});

app.get("/", (req, res) => {
  const q = "SELECT * FROM student";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/student", (req, res) => {
  const q = "INSERT INTO student (`Name`, `Email`) VALUES (?)";
  const values = [req.body.name, req.body.email];
  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("Student has been created successfully");
  });
});

app.get("/read/:id", (req, res) => {
  const q = "SELECT * FROM student where ID = ?";
  const values = [req.params.id];

  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.put("/update/:id", (req, res) => {
  const q = "UPDATE student SET `Name` = ?, `Email` = ? WHERE ID = ?";
  const values = [req.body.name, req.body.email, req.params.id];
  //hii
  db.query(q, values, (err, data) => {
    if (err) return res.json(err);
    return res.json("Student has been updated successfully");
  });
});

app.delete("/delete/:id", (req, res) => {
  const q = "DELETE FROM student WHERE ID = ?";
  const values = [req.params.id];

  db.query(q, values, (err, data) => {
    if (err) return res.json(err);
    return res.json("Student has been deleted successfully");
  });
});

app.listen(8081, () => {
  console.log("Server is running on port 8081");
});
