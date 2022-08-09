require("dotenv").config();
const express = require('express');
const mysql = require('mysql');
const app = express();

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



//SERVEUR
app.listen(process.env.PORT, () => {
  console.log(`le serveur tourne au port ${process.env.PORT}`)
})