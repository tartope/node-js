const cors = require("cors");
const express = require("express");
// const sqlProxy = require("./sqlProxy");
const { body, check, param, validationResult } = require("express-validator");
const { promisePool } = require("./PromisePool");

const PORT = 80;
const app = express();
const corsOptions = {
  origin: ["http://localhost:3000"],
  optionsSuccessStatus: 200,
};

// Middleware...
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Your endpoints here..

app.get("/message", cors(corsOptions), async (req, res) => {
  res.send({ message: "Hello Tunisia!!" });
});

// app.get("/cars", cors(corsOptions), async (req, res) => {
// //   const car = await promisePool.query('SELECT * FROM car');
// //   console.log(car)
// //   res.send(car[0]);
// const [rows] = await promisePool.query('SELECT * FROM car');
// console.log(rows)
// res.send(rows)
// });

app.get('/cars/:id', cors(corsOptions), async (req, res)=>{
    const carId = req.params['id']
    const [rows] = await promisePool.query('SELECT * from car WHERE car_id = ?', [carId]);
    console.log(rows);
    res.send(rows)
});

app.get('/cars', cors(corsOptions), async (req, res)=>{
    const make = req.query['make']
    const [rows] = await promisePool.query('SELECT * from car WHERE make = ?', [make]);
    console.log(rows)
    res.send(rows)
});

app.listen(PORT, () => {
  console.log(`Express web API running on port: ${PORT}.`);
});
