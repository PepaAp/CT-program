import express from 'express';
import axios from 'axios';
const app = express();
const PORT: number = 3000;

app.use(express.static('public'));
app.use("/dist", express.static('dist'));


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.get("/ct/:program", (req, res) => {
    const d: Date = new Date();

    axios.get('https://www.ceskatelevize.cz/services-old/programme/xml/schedule.php', {
        params: {
            user: "test",
            date: `${d.getDate()}.${(d.getMonth() + 1).toString().padStart(2, "0")}.${d.getFullYear()}`,
            channel: `ct${req.params["program"]}`,
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
