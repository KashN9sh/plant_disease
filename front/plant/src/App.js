import logo from './logo.svg';
import './App.css';
import axios from 'axios'

function handleFileChange(e) {
  const file = e.target.files[0];

  const formData = new FormData();
   formData.append("files", file);
   axios({
     method: "post",
     url: "/files/",
     data: formData,
     headers: {
      'Content-Type': 'multipart/form-data'
    }
  }).then(res => {
    console.log("REs", res)
  })
}

function App() {
  

  return (
    <div className="App">
      
      <div className="container text-center">
        <h1>Приветики!</h1>
        <h2>( ˙꒳​˙ )</h2>

        <div className="mb-3">
          <input className="form-control" type="file" id="formFile" onChange={handleFileChange}/>
        </div>

      
      </div>
    </div>
  );
}

export default App;
