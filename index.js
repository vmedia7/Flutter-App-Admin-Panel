const express = require('express');
const cors = require('cors');
const fs = require("fs");
const path = require("path");

const app = express()
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));

app.listen(8000, () => console.log(`Example app listening on port 8000!`));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'html', '/index.html'));
});

app.get('/data', async (req, res) => {
    const rawData = fs.readFileSync(path.join(__dirname, "data", "dashboard-data.json"), "utf8");
    const data = JSON.parse(rawData);
    res.status(200).json({status: true, message: "", data: data})
});

app.post('/update', async (req, res) => {
   const { data } = req.body;
   fs.writeFileSync(path.join(__dirname, "data", "dashboard-data.json"), JSON.stringify(data), "utf8");
   res.status(201).json({status: true, message: "", data: {}});
});
