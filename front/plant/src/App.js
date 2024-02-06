import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
        <form action="/files/" enctype="multipart/form-data" method="post">
          <input name="files" type="file" multiple/>
          <input type="submit"/>
        </form>
    </div>
  );
}

export default App;
