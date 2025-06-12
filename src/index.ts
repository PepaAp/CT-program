import express from 'express';
const axios = require('axios');
const app = express();
const PORT: number = 3000;

app.use(express.static('public'));
app.use(express.static('dist'));


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
    
});

app.get('/frontend-script', (req, res) => {
    res.sendFile(__dirname + '/program.js');
})

app.get("/ct", (req, res) => {
    const d: Date = new Date();    

    axios.get('https://www.ceskatelevize.cz/services-old/programme/xml/schedule.php', {
        params: {
            user: "test",
            date: `${d.getDate()}.${(d.getMonth() + 1).toString().padStart(2, "0")}.${d.getFullYear()}`,
            channel: "ct1",
            json: 1
        }
    })
    .then(function (response) {
        res.send(response.data.porad);
    })
});


app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
