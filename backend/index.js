import express from "express"
import morgan from "morgan"
import bodyParser from "body-parser"

const PORT = 3000;

const app = express();

// Middlewares
app.use(morgan("tiny"));
app.use(bodyParser.json());


// Routes
app.get("/" , (req, res) => {
    res.send("News Ranking Tool Api");
})

app.post("/query", (req,res) => {
    const {data} = req.body;
    res.send(data);
})

// Server
app.listen(PORT,() => {
    console.log(`Running on port: ${PORT}`);
})