const express = require('express');
const app = express();

const path = require('path');

app.set('port', 3001);

app.listen(app.get('port'), () =>{
    console.log('Server on port', app.get('port'));
})

app.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname, './views/index.html'))
})