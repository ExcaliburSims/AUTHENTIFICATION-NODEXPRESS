require('dotenv').config();
const express = require('express');
const mysql = require('mysql');
const app = express();
/////////////////////////////////////////////////////////////////////////////////////////
//CONNEXION TO DATABASE
const connex = mysql.createPool({
	connectionLimit: 10,
   host: process.env.DB_HOST,
   user: process.env.DB_USER,
   password: process.env.DB_PASSWORD,
   database : process.env.DB_DATABASE,
});
connex.getConnection((err) => {
  if (err) {
    console.error('Une erreur detectée : ' + err);
    return
  }
  else {
    console.log("Connecté à la base de données MySQL!"); 
  }
})

///////////////////////////////////////////////////////////////////////////////





//FIRST REQUETE TO VIEW ALL USERS ON THE DATABASE

app.get('/users', (req, res) => {
  const sql1 = 'select * from userTable'
  connex.query(sql1, (err, resultat) => {
    if (err) throw err
      res.send(resultat)
  })
})

//CREATE USER
//Middlewre

app.use(express.json())

app.post("/users/register", async (req, res) => {
  const {user, password} = req.body
  const sqlInsert = 'INSERT INTO userTable (user,password) VALUES (?,?)'

  connex.query(sqlInsert, [user, password], (err, result) => {
    if (err) throw err
    console.log('--------> Created new User')
    res.send(result)
  })
})

//LOGIN USER

app.post("/users/login", async (req, res) => {
  const {user, password} = req.body
  const sqllogin = 'select * from userTable where user=? AND password=?'

  connex.query(sqllogin, [user, password], (err, result) => {
    if (err) {
      res.status(500).send(err)
    } else if (result.length > 0) {
      res.status(200).send(result[0])
    } else {
      res.status(400).send("L'utilisateur n'existe pas")
    }
    // connect.end()
  })
})
////////////////////////////////////////////////////////////////////////////////


//SERVEUR
app.listen(process.env.PORT, () => {
  console.log(`le serveur tourne au port ${process.env.PORT}`)
})