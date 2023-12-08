import express from "express"
import morgan from "morgan"

const app = express()
const PORT =  3000

app.use(morgan("tiny"))

app.get("/" , (req, res) => {
    res.send("News Ranking Tool Api")
})

app.post("/query", (req,res) => {
    const data = req.body.data;
    res.send(data)
})


app.listen(PORT,() => {
    console.log(`Running on port: ${PORT}`)
})