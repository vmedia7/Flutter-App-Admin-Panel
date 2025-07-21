const express = require('express');
const cors = require('cors');
// const fs = require("fs");
const path = require("path");
const mongoose = require('mongoose');
const Menu = require('./mongodb/menu');

const app = express()
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));

const databasePath = 'mongodb+srv://stdmc:FcuVSKIzvOTpYXXz@cluster0.sibj2b7.mongodb.net/rapture_ready_panel?retryWrites=true&w=majority&appName=Cluster0';

//const databasePath = 'mongodb://127.0.0.1:27017/rr_panel'

mongoose.connect(databasePath)
    .then((result) => /*server*/ {
        // const rawData = fs.readFileSync(path.join(__dirname, "data", "dashboard-data.json"), "utf8");
        // const data = JSON.parse(rawData);
        // saveMenuData(data).catch(err => console.error("error saving data", err));

        app.listen(8010, () => {
            console.log('listening on port 8010!');    
        });
    }).catch((err) => console.log(err));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'html', '/index.html'));
});

/*sB2F8tB7OafaqEdi
noreplyeternityready*/

app.get('/data', async (req, res) => {
    /*const rawData = fs.readFileSync(path.join(__dirname, "data", "dashboard-data.json"), "utf8");
    const data = JSON.parse(rawData);*/
    
    try {
        const data = await getMenuData();
        res.status(200).json({status: true, message: "", data: data});
    } catch (error) {
        console.log("error fetching data", error);
        res.status(500).send(error);
    }
});

app.post('/update', async (req, res) => {
   const { data } = req.body;
   // fs.writeFileSync(path.join(__dirname, "data", "dashboard-data.json"), JSON.stringify(data), "utf8");

   try {
    await saveMenuData(data);
    res.status(201).json({status: true, message: "", data: {}});
   } catch (error) {
    console.log("error updating data", error);
    res.status(500).send(error);
   }
});

async function saveMenuData(data) {
    // Remove existing data (optional - if you want to replace it)
    await Menu.deleteMany({});
      
    // Save new data
    const menu = new Menu(data);
    await menu.save();
}

async function getMenuData() {
    const menuData = await Menu.findOne(); // Get the first (or only) menu document
    return menuData;
}
