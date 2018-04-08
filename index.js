const express = require('express')
const app = express()
const exec = require('child_process').exec;
app.get('/read_sensor', function (req, res) {
  exec('./read_sensor.py', (e, stdout, stderr)=> {
    if (e instanceof Error) {
        console.error(e);
        throw e;
    }
    res.setHeader('Content-Type', 'application/json');
    res.send(stdout);
  });
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
