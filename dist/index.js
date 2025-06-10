"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios = require('axios');
const app = (0, express_1.default)();
const PORT = 3000;
app.use(express_1.default.static('public'));
app.use(express_1.default.static('dist'));
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});
app.get('/frontend-script', (req, res) => {
    res.sendFile(__dirname + '/program.js');
});
app.get("/ct", (req, res) => {
    const d = new Date();
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
        console.log(d.getDate() + 1);
    });
});
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
