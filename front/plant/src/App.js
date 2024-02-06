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
      <head>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <title>Bootstrap demo</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous"/>
      </head>
      <body>
        <div className="container text-center">
          <h1>Приветики!</h1>
          <h2>( ˙꒳​˙ )</h2>

          <div class="mb-3">
            <input className="form-control" type="file" id="formFile" onChange={handleFileChange}/>
          </div>

          <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
        
        </div>
      </body>
    </div>
  );
}

export default App;
