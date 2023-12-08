import express from "express"
import morgan from "morgan"
import bodyParser from "body-parser"
import cors from "cors"
import { spawn } from "child_process"


const PORT = 3000;

const app = express();

// Middlewares
app.use(morgan("tiny"));
app.use(cors())
app.use(bodyParser.json());


// Routes
app.get("/", (req, res) => {
    res.send("News Ranking Tool Api");
})

app.post("/query", (req, res) => {
    const { data } = req.body;
    console.log(data)

    const filePath = "main.py"
    const pythonProcess = spawn("python",[filePath,data]);
    pythonProcess.stdout.on('data', (data) => {
        res.send(data.toString())
    })
    pythonProcess.stderr.on('data', (data) => {
        console.log(data.toString());
    })
    pythonProcess.on('close', (code) => {
        if (code !== 0) {
            console.error(code);
        } else {
            console.log(code);
        }
    })
})

// Server
app.listen(PORT, () => {
    console.log(`Running on port: ${PORT}`);
})