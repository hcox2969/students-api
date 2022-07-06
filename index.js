const express = require("express")

const app = express()

app.use(express.json())

const students = [
  {id: 1, FirstName: "Tim", LastName: "Oberman", PhoneNumber: "3303232324", StateCode: 10},
  {id: 2, FirstName: "Bella", LastName: "Peck", PhoneNumber: "3303232324", StateCode: 12},
  {id: 3, FirstName: "Mark", LastName: "Baum", PhoneNumber: "3303232324", StateCode: 15},
]

const states = [
  {StateCode: 10, StateName: "GA"},
  {StateCode: 12, StateName: "IL"},
  {StateCode: 15, StateName: "KS"},
  {StateCode: 20, StateName: "MA"},
  {StateCode: 14, StateName: "IA"},
  {StateCode: 14, StateName: "IA"},
]

app.get('/', (req, resp)=> {
  resp.send('Welcome to the Student List')
})

app.get('/api/students', (req, resp) => {
  resp.send(students)
})

app.get('/api/students/:id', (req, resp) => {
  const student = students.find(v => v.id === parseInt(req.params.id))
  if(!student) resp.status(404).send('student not found')
  resp.send(student)
})

app.post('/api/students/addStudent', (req, resp) => {
  const student = {
    id: students.length+1,
    FirstName: req.body.FirstName,
    SecondName: req.body.SecondName,
    PhoneNumber: req.body.PhoneNumber,
    StateCode: req.body.StateCode
  }
  students.push(student)
  resp.send(student)
})
app.listen(8000)