const fs = require("fs");
const cors = require("cors");
const mysql = require("mysql");
const express = require("express");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("./"));

const host = "127.0.0.1";
const port = 3000;



const database = mysql.createConnection
({
    user: "root",
    host: "127.0.0.1",
    port: 3306,
    password: "",
    database: "fogado",
});



app.get("/", (req, res) =>
{
    fs.readFile("fogado.html", (error, data) =>
    {
        if (error)
        {
            return console.error(error);
        };

        res.writeHead(200, {"Content-Type": "text/html"});
        res.write(data);
        res.end();
    });
});

app.get("/szobak-osszes", (req, res) =>
{
    const sql = "SELECT * FROM `szobak`";

    database.query(sql, (error, result) =>
    {
        if (error)
        {
            return res.json(error);
        };

        return res.json(result);
    });
});

app.get("/szobak/:nev/:agyak/:potagyak", (req, res) =>
{
    const nev = req.params.nev;
    const agyak = req.params.agyak;
    const potagyak = req.params.potagyak;

    const sql = `SELECT * FROM szobak WHERE sznev = ? AND agy = ? AND potagy = ?`;

    database.query(sql, [nev, agyak, potagyak], (error, result) =>
    {
        if (error) {
            return res.json({ error: error.message });
        }

        return res.json(result);
    });
});




app.listen(port, host, () =>
{
    console.log(`A szerver sikeresen elindult a http://${host}:${port} oldalon!`);
});