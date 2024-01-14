const express = require('express')
const mongoose = require('mongoose');
const Student = require('./models/student')

const app = express()
const port = 3000

//middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//routes

// create a student data

app.post('/students', async (req, res) => {
    try {
        const student = await Student.create(req.body)
        res.status(200).json(student);        
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
  })

  //fetch data 

  app.get('/students', async (req,res) => {
    try {
        const students = await Student.find({});
        res.status(200).json(students)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
        
    }
  })

    //fetch data by id

    app.get('/students/:id', async (req,res) => {
        try {
            const {id} = req.params;
            const student = await Student.findById(id);
            res.status(200).json(student)
        } catch (error) {
            console.log(error.message)
            res.status(500).json({message: error.message})
        }
    })

    //update data by id

    app.put('/students/:id', async (req,res) => {
        try {
            const {id} = req.params;
            const student = await Student.findByIdAndUpdate(id,req.body);
    // we cannot find the data by id after updating it
            if(!student){
                return res.status(404).json({message: `student with id ${id} not found`})
            }
            // get latest updated data
            const updatedstudent = await Student.findByIdAndUpdate(id);
            res.status(200).json(updatedstudent)
        } catch (error) {
            console.log(error.message)
            res.status(500).json({message: error.message})
        }
    })

//db connection

mongoose.connect('mongodb+srv://admin:admin@cluster0.dkh3jgk.mongodb.net/?retryWrites=true&w=majority').then(()=>{
    app.get('/', (req, res) => {
        res.send('Hello World!')
      })
    console.log('connected to db')
}).catch((err)=>{
    console.log(err)
})


app.listen(port, () => {
    console.log(`app listening on port ${port}`)
  })
  