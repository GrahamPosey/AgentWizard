import express from 'express'
//import connectDB from '../client/src/db.js'
import mongoose, { model } from 'mongoose'
import { Schema } from 'mongoose'
//import Agent from '../model/Agent.js'
const app = express()
const port = 5000
mongoose
  .connect('mongodb://localhost:27017/AgentDb')
  .then(() => {
    console.log('MongoDB connected')
    app.listen(port, () => {
      console.log('Server is listening on port ', port)
    })
  })
  .catch(err => {
    console.error(`Error: ${err.message}`)
    process.exit(1)
  })
app.use(express.json())
const agentSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  agentjob: {
    type: String,
    required: true
  }
})

const dbModel = mongoose.model('Agent', agentSchema)
// Query all items
app.get('/agents', async (req, res) => {
  try {
    console.log('Calling Items new')
    const items = await dbModel.find()
    console.log('items = ' + items)
    res.json(items)
  } catch (err) {
    console.error('Query Error = ' + err)
    res.status(500).send('Error querying the database' + err)
  }
  //res.json({"agents": ["agentOne", "agentTwo", "agentThree", "agentFour"]});
})
