import express from 'express';
import connectDB from '../client/src/db.js';
const app = express();
const port = 5000;
app.use(express.json());
connectDB();
app.get('/api', (req, res) => {
    res.json({"agents": ["agentOne", "agentTwo", "agentThree", "agentFour"]});
});

app.listen(port, () => {
        console.log('Server is listening on port ', port);
});