const express = require('express');
const app = express();
const port = 5000;
app.get('/api', (req, res) => {
    res.json({"agents": ["agentOne", "agentTwo", "agentThree", "agentFour"]});
});

app.listen(port, () => {
        console.log('Server is listening on port ', port);
});