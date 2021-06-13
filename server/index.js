const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

const mysql = require('mysql');

const db = mysql.createConnection({
    user: 'root',
    host:'localhost',
    password:'salman',
    database:'UserRegistration'
})

app.post('/insert',(req,res) => {
    const name = req.body.name;
    const password = req.body.password;
    const email  = req.body.email;
    const gender = req.body.gender;
    const semester = req.body.semester 

    db.query("INSERT INTO User(name,password,email,gender,semester) VALUES (?,?,?,?,?)",[name,password,email,gender,semester],
    (err,result) => {
        if (err) throw err;

        res.send("Values are Added");
    })

});

app.get('/get_user',(req,res) => {
    db.query("SELECT * FROM User",(err,result) => {
        if (err) throw err;

        res.send(result);
    })
})


app.put('/update',(req,res) => {
    const id = req.body.id;
    const password = req.body.password;
    db.query("UPDATE User SET password = ? WHERE user_id = ?",[password,id],(err,result) => {
        if (err) throw err;
        res.send(result);
    })
})

app.delete("/delete/:id", (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM User WHERE user_id = ?", [id], (err, result) => {
      if (err) throw err;

      res.send(result);
    });
  });

app.listen(3002,() => {
    console.log("Yes server is running");
})