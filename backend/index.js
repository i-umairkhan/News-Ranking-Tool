import express from "express"
import morgan from "morgan"
import bodyParser from "body-parser"

const app = express()
const PORT =  3000

app.use(morgan("tiny"))
app.use(bodyParser.json())


app.get("/" , (req, res) => {
    res.send("News Ranking Tool Api")
})

app.post("/query", (req,res) => {
    const {data} = req.body;
    res.send(data)
})


app.listen(PORT,() => {
    console.log(`Running on port: ${PORT}`)
})