import "./App.css";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function App() {
  const [query, setQuery] = useState("");
  const [news, setNews] = useState([]);

  const getData = () => {
    fetch("http://localhost:3000/query", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: query,
      }),
    })
      .then((response) => response.json())
      .then((json) => setNews(json));
  };
  return (
    <>
      <h1>News Ranking Tool</h1>
      <h3>This tool is trained on DAWN News dataset.</h3>
      <TextField
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        label="Search Query"
        sx={{
          marginTop: "20px",
          marginRight: "20px",
        }}
      />
      <Button
        variant="contained"
        onClick={getData}
        sx={{
          marginTop: "20px",
          marginRight: "20px",
          padding: "15px",
        }}
      >
        Search
      </Button>
      {news.map((a) => (
        <h3>{a.headline}</h3>
      ))}
    </>
  );
}

export default App;
