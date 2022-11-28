const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const mongoClient = require('mongodb').MongoClient;
const app = express();

app.use(morgan('dev'));

var db;
var dbUrl = "mongodb+srv://admin:1234@cluster0.aua2km8.mongodb.net/?retryWrites=true&w=majority" 
app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.get('/first-name', (req, res) => {
  console.log(mongoClient)
  mongoClient.connect(dbUrl, function(err, database) {
    if (err != null) {
      res.json({'count' : 0});
      console.log(err);
    } else {
      db = database.db('test');
      db.collection('things').find({}, {_id:0, id:1, name:1})
      .toArray(function(err, result) {
        if (err) throw err;
        console.log('result: ');
        console.log(result);

        res.writeHead(200);
        var template = `
            <table border="1" margin: auto; text-align: center;>
            <tr>
              <th> 순위 </th>
              <th> 성씨 </th>
            </tr>
        `;

	result.forEach((item) => {
        	template += `
        	<tr>
        		<th>${item.id}</th>
        		<th>${item.name}</th>
        	</tr>`
        });

         template +=`</table>`;
      res.end(template);
      });
    }
  });
});

module.exports = app;
