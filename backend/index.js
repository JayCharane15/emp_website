import express from "express";
import cors from "cors";
import mysql from "mysql"


const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "pass",
    database: "employee",
});

app.post('/create', (req,res)=> {
    const values = [
        req.body.name,
        req.body.age,
        req.body.gender,
        req.body.country,
        req.body.position,
        req.body.salary,

    ]

    const q = "INSERT INTO employees(`name`, `age`, `gender`, `country`, `position`, `salary`) VALUES (?)";

    db.query(q,[values], (err,data) => {
        if (err) return res.send(err);
        return res.json(data);
    })
})

app.get('/employees', (req,res) => {
    const q = "SELECT * FROM employees";
    db.query(q, (err, data) => {
    if (err) {
        console.log(err);
        return res.json(err);
    }
    return res.json(data);
    });
})

app.listen(3001, () => {
    console.log("Connected to backend")

})