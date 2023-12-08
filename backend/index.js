import { spawn } from "child_process"
import express from "express"
import morgan from "morgan"
import bodyParser from "body-parser"


const PORT = 3000;

const app = express();

// Middlewares
app.use(morgan("tiny"));
app.use(bodyParser.json());


// Routes
app.get("/", (req, res) => {
    res.send("News Ranking Tool Api");
})

app.post("/query", (req, res) => {
    const { data } = req.body;

    const filePath = "/workspaces/News-Ranking-Tool/backend/main.py"
    const pythonProcess = spawn("python",[filePath,data]);
    pythonProcess.stdout.on('data', (data) => {
        process.stdout.write(data);
        console.log(data,"")
    })
    pythonProcess.stderr.on('data', (data) => {
        console.log(data);
    })
    pythonProcess.on('close', (code) => {
        if (code !== 0) {
            console.error(code);
        } else {
            console.log(code);
        }
    })

    res.send(data);
})

// Server
app.listen(PORT, () => {
    console.log(`Running on port: ${PORT}`);
})