import express from 'express'
import { createForm, deleteForm, getAllForms, getFormById, updateForm } from './models/controller/formControler.js'
import cors from 'cors'
import connect from './config/db.js'
var app = express()
 
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use(express.json())
app.use(cors())

// controllers
app.post("/form/create",createForm)
app.get("/form/all",getAllForms)
app.get("/form/list/:id",getFormById)
app.delete("/form/dlt/:id",deleteForm)
app.put("/form/edit/:id",updateForm)


connect()

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
