const express = require('express');

var app = express();

app.get('/', (req, res) => {
    res.send('dusan');
})

app.listen(8000);