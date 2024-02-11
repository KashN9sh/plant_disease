import logo from "./logo.svg";
import { useState } from "react";

import "./App.css";
import axios from "axios";

function App() {
  const [result, setResult] = useState({
    name: "",
    description: "",
    how_to_kill: "",
  });

  function handleFileChange(e) {
    const file = e.target.files[0];

    const formData = new FormData();
    formData.append("files", file);
    axios({
      method: "post",
      url: "/files/",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then((res) => {
      setResult({
        ...{},
        ...res.data,
      });
      console.log("REs", res);
    });
  }

  return (
    <div>
      <div className="container">
        <div className="text-center">
          <h1>Приветики! ( ˙꒳​˙ )</h1>
          <input
            className="form-control"
            type="file"
            id="formFile"
            onChange={handleFileChange}
          />
        </div>

        {result.name && (
          <div className="row mt-3">
            <h1 className="text-center">{result.name}</h1>

            <div className="col-md-12 mb-3 text-start">
              <h2>Описание</h2>
              <p>{result.description}</p>
            </div>
            {result.how_to_kill && (
              <div className="col-md-12 mb-3 text-start row">
                <h2>Чем лечить</h2>
                <div className="col-md-6">
                  <h3>Химические пестициды</h3>
                  <div className="col-md-12 row">
                    <div className="col-md-6">
                      <table className="table">
                        <thead>
                          <tr>
                            <th scope="col">Опрыскивание по вегетации:</th>
                          </tr>
                        </thead>
                        <tbody>
                          {result.how_to_kill.chemical.veg.map((p) => {
                            return (
                              <tr>
                                <th scope="row">{p}</th>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                    <div className="col-md-6">
                      <table className="table">
                        <thead>
                          <tr>
                            <th scope="col">В личных подсобных хозяйствах:</th>
                          </tr>
                        </thead>
                        <tbody>
                          {result.how_to_kill.chemical.self.map((p) => {
                            return (
                              <tr>
                                <th scope="row">{p}</th>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <h3>Биологические пестициды</h3>
                  <div className="col-md-12 row">
                    <div className="col-md-6">
                      <table className="table">
                        <thead>
                          <tr>
                            <th scope="col">Опрыскивание по вегетации:</th>
                          </tr>
                        </thead>
                        <tbody>
                          {result.how_to_kill.biological.veg.map((p) => {
                            return (
                              <tr>
                                <th scope="row">{p}</th>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                    <div className="col-md-6">
                      <table className="table">
                        <thead>
                          <tr>
                            <th scope="col">В личных подсобных хозяйствах:</th>
                          </tr>
                        </thead>
                        <tbody>
                          {result.how_to_kill.biological.self.map((p) => {
                            return (
                              <tr>
                                <th scope="row">{p}</th>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
