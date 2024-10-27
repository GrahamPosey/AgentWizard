import express from 'express'
//import connectDB from '../client/src/db.js'
import mongoose, { model } from 'mongoose'
import { Schema } from 'mongoose'
import cors from 'cors';
import OpenAI from "openai";
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
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
  }));
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
app.post('/api/generate', async (req, res) => {
      const openai = new OpenAI({
        apiKey: '',
    });   
    //   const prompt = req;
    //   const role = req.role;
      const { role, promptText } = req.body;

  try {
    console.log('role = ' + role);
    console.log('promptText = ' + promptText);

    const completion = await openai.chat.completions.create({
        messages: [
            {
                role: "system",
                content: `${role}`
            },
            {
                role: "user",
                content: `${promptText}`
            }],
        model: "gpt-3.5-turbo",
        stream: true, // Enable streaming

    });
    console.log(completion);
    for await (const chunk of completion) {
        const content = chunk.choices[0].delta?.content;
  
        if (content) {
          console.log('message = ' + content); // Log the message content
          res.write(`${content}\n\n`); // Stream content to the client
        }

    };

    res.write(`[DONE]\n\n`);
    res.end();

    //res.json({ text: 'This is where the answer goes.' });
  } catch (error) {
    console.error(error);
    res.write(`data: Error: ${error.message}\n\n`);
    res.end();
  }

});
app.post('/createagent', async (req, res) => {
    try {
      const newAgent = new dbModel(req.body);
      const savedAgent = await newAgent.save();
      res.status(201).json(savedAgent);
    } catch (error) {
      console.error('Error saving agent:', error);
      res.status(500).send('Error saving agent');
    }
  });
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
