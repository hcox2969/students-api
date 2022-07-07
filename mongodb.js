const express = require('express')
const MongoClient = require('mongodb').MongoClient

const app = express()

app.use(express.json())
var database

app.get('/', (req, resp) => {
  resp.send("Welcome to mongoDB!")
})

app.get('/api/students', (req, resp) => {
  database.collection('students').find({}).toArray((err, result) => {
    if(err) throw err
    resp.send(result)
  })
})

app.post('/api/students/addStudent', (req, resp) => {
  let res = database.collection('students').find({}).sort({id: -1}).limit(1)
  res.forEach(obj => {
    if(obj){
      let student = {
        id: obj.id +1,
        FirstName: req.body.FirstName,
        SecondName: req.body.SecondName,
        PhoneNumber: req.body.PhoneNumber,
        StateCode: req.body.StateCode
      }
      database.collection('students').insertOne(student, (err, result) => {
        if(err) resp.status(500).send(err)
        resp.send('Added Successfully')
      })
    }
  })
})

app.listen(8080, () => {
  MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true }, (error, result) => {
    if(error) throw error
    database = result.db('mydatabase')
    console.log('Connection successful')
  })
})