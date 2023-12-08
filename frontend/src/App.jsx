import './App.css'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function App() {
  return (
    <>
      <h1>News Ranking Tool</h1>
      <h3>This tool is trained on DAWN News dataset.</h3>
      <TextField
        label="Search Query"
        sx={{
          marginTop: "20px",
          marginRight: "20px",
        }}
      />
      <Button variant="contained"
        sx={{
          marginTop: "20px",
          marginRight: "20px",
          padding: "15px"
        }}
      >Search</Button>
    </>
  )
}

export default App
