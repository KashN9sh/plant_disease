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
      url: "/api/files/",
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
    <main>
      <div class="container py-4">
        <header class="pb-3 mb-4 border-bottom">
          <a
            href="/"
            class="d-flex align-items-center text-body-emphasis text-decoration-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="32"
              fill="currentColor"
              class="bi bi-flower1"
              viewBox="0 0 16 16"
            >
              <path d="M6.174 1.184a2 2 0 0 1 3.652 0A2 2 0 0 1 12.99 3.01a2 2 0 0 1 1.826 3.164 2 2 0 0 1 0 3.652 2 2 0 0 1-1.826 3.164 2 2 0 0 1-3.164 1.826 2 2 0 0 1-3.652 0A2 2 0 0 1 3.01 12.99a2 2 0 0 1-1.826-3.164 2 2 0 0 1 0-3.652A2 2 0 0 1 3.01 3.01a2 2 0 0 1 3.164-1.826M8 1a1 1 0 0 0-.998 1.03l.01.091q.017.116.054.296c.049.241.122.542.213.887.182.688.428 1.513.676 2.314L8 5.762l.045-.144c.248-.8.494-1.626.676-2.314.091-.345.164-.646.213-.887a5 5 0 0 0 .064-.386L9 2a1 1 0 0 0-1-1M2 9l.03-.002.091-.01a5 5 0 0 0 .296-.054c.241-.049.542-.122.887-.213a61 61 0 0 0 2.314-.676L5.762 8l-.144-.045a61 61 0 0 0-2.314-.676 17 17 0 0 0-.887-.213 5 5 0 0 0-.386-.064L2 7a1 1 0 1 0 0 2m7 5-.002-.03a5 5 0 0 0-.064-.386 16 16 0 0 0-.213-.888 61 61 0 0 0-.676-2.314L8 10.238l-.045.144c-.248.8-.494 1.626-.676 2.314-.091.345-.164.646-.213.887a5 5 0 0 0-.064.386L7 14a1 1 0 1 0 2 0m-5.696-2.134.025-.017a5 5 0 0 0 .303-.248c.184-.164.408-.377.661-.629A61 61 0 0 0 5.96 9.23l.103-.111-.147.033a61 61 0 0 0-2.343.572c-.344.093-.64.18-.874.258a5 5 0 0 0-.367.138l-.027.014a1 1 0 1 0 1 1.732zM4.5 14.062a1 1 0 0 0 1.366-.366l.014-.027q.014-.03.036-.084a5 5 0 0 0 .102-.283c.078-.233.165-.53.258-.874a61 61 0 0 0 .572-2.343l.033-.147-.11.102a61 61 0 0 0-1.743 1.667 17 17 0 0 0-.629.66 5 5 0 0 0-.248.304l-.017.025a1 1 0 0 0 .366 1.366m9.196-8.196a1 1 0 0 0-1-1.732l-.025.017a5 5 0 0 0-.303.248 17 17 0 0 0-.661.629A61 61 0 0 0 10.04 6.77l-.102.111.147-.033a61 61 0 0 0 2.342-.572c.345-.093.642-.18.875-.258a5 5 0 0 0 .367-.138zM11.5 1.938a1 1 0 0 0-1.366.366l-.014.027q-.014.03-.036.084a5 5 0 0 0-.102.283c-.078.233-.165.53-.258.875a61 61 0 0 0-.572 2.342l-.033.147.11-.102a61 61 0 0 0 1.743-1.667c.252-.253.465-.477.629-.66a5 5 0 0 0 .248-.304l.017-.025a1 1 0 0 0-.366-1.366M14 9a1 1 0 0 0 0-2l-.03.002a5 5 0 0 0-.386.064c-.242.049-.543.122-.888.213-.688.182-1.513.428-2.314.676L10.238 8l.144.045c.8.248 1.626.494 2.314.676.345.091.646.164.887.213a5 5 0 0 0 .386.064zM1.938 4.5a1 1 0 0 0 .393 1.38l.084.035q.108.045.283.103c.233.078.53.165.874.258a61 61 0 0 0 2.343.572l.147.033-.103-.111a61 61 0 0 0-1.666-1.742 17 17 0 0 0-.66-.629 5 5 0 0 0-.304-.248l-.025-.017a1 1 0 0 0-1.366.366m2.196-1.196.017.025a5 5 0 0 0 .248.303c.164.184.377.408.629.661A61 61 0 0 0 6.77 5.96l.111.102-.033-.147a61 61 0 0 0-.572-2.342c-.093-.345-.18-.642-.258-.875a5 5 0 0 0-.138-.367l-.014-.027a1 1 0 1 0-1.732 1m9.928 8.196a1 1 0 0 0-.366-1.366l-.027-.014a5 5 0 0 0-.367-.138c-.233-.078-.53-.165-.875-.258a61 61 0 0 0-2.342-.572l-.147-.033.102.111a61 61 0 0 0 1.667 1.742c.253.252.477.465.66.629a5 5 0 0 0 .304.248l.025.017a1 1 0 0 0 1.366-.366m-3.928 2.196a1 1 0 0 0 1.732-1l-.017-.025a5 5 0 0 0-.248-.303 17 17 0 0 0-.629-.661A61 61 0 0 0 9.23 10.04l-.111-.102.033.147a61 61 0 0 0 .572 2.342c.093.345.18.642.258.875a5 5 0 0 0 .138.367zM8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3" />
            </svg>
            <span class="fs-4">Plant disease</span>
          </a>
        </header>

      <div className="row ">
        <div className={`${result.name ?"col-lg-4":"col-lg-12"} p-5 mb-3 bg-green-200 rounded-3 animate__animated animate__bounceInRight`}>
          <div class="container-fluid py-5">
            <h1 class="display-5 fw-bold">Привет</h1>
            <p class="col fs-4">
              Это приложение для определения болезней листьев плодовых растений. <br/>
              Для начала, загрузите фото.
            </p>

            <div class="row g-3 align-items-center">
              <div class="col-auto">
                <input
                  className="form-control col-md-3"
                  type="file"
                  id="formFile"
                  onChange={handleFileChange}
                />
              </div>
            </div>
          </div>
        </div>
          
        {result.name && (

          <div class="col p-5 mb-3 ms-lg-3 bg-yellow-200 rounded-3 animate__animated animate__bounceInRight animate__delay-1s">
            <div class="container-fluid py-5">
              <h2>{result.name}</h2>
              <p>
              {result.description}
              </p>
            </div>
          </div>
          )}
        <div class="row align-items-md-stretch">

        {/* {result.how_to_kill && (

          <div class="col-md-6">
            <div class="h-100 p-5 bg-body-tertiary rounded-3">
              <h2>Чем лечить</h2>
              {result.how_to_kill.chemical && (
                  <div className="col-md-12">
                    <h3>Химические пестициды</h3>
                    <div className="col-md-12 row">
                      {result.how_to_kill.chemical.veg && (
                        <div className="col-md-12">
                          <table className="table ">
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
                      )}
                      {result.how_to_kill.chemical.self && (
                        <div className="col-md-12">
                          <table className="table">
                            <thead>
                              <tr>
                                <th scope="col">
                                  В личных подсобных хозяйствах:
                                </th>
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
                      )}
                    </div>
                  </div>
                )}
            </div>
          </div>
          )} */}


        </div>
        </div>

        <footer class="pt-3 mt-4 text-body-secondary border-top">© 2024</footer>
      </div>
    </main>
    // <div>
    //   <div className="container">
    //     <div className="text-center">
    //       <h1>Приветики! ( ˙꒳​˙ )</h1>
    //       <input
    //         className="form-control"
    //         type="file"
    //         id="formFile"
    //         onChange={handleFileChange}
    //       />
    //     </div>

    //     {result.name && (
    //       <div className="row mt-3">
    //         <h1 className="text-center">{result.name}</h1>

    //         <div className="col-md-12 mb-3 text-start">
    //           <h2>Описание</h2>
    //           <p>{result.description}</p>
    //         </div>
    //         {result.how_to_kill && (
    //           <div className="col-md-12 mb-3 text-start row">
    //             <h2>Чем лечить</h2>
    //             {result.how_to_kill.chemical && (
    //               <div className="col-md-6">
    //                 <h3>Химические пестициды</h3>
    //                 <div className="col-md-12 row">
    //                   {result.how_to_kill.chemical.veg && (
    //                     <div className="col-md-6">
    //                       <table className="table">
    //                         <thead>
    //                           <tr>
    //                             <th scope="col">Опрыскивание по вегетации:</th>
    //                           </tr>
    //                         </thead>
    //                         <tbody>
    //                           {result.how_to_kill.chemical.veg.map((p) => {
    //                             return (
    //                               <tr>
    //                                 <th scope="row">{p}</th>
    //                               </tr>
    //                             );
    //                           })}
    //                         </tbody>
    //                       </table>
    //                     </div>
    //                   )}
    //                   {result.how_to_kill.chemical.self && (
    //                     <div className="col-md-6">
    //                       <table className="table">
    //                         <thead>
    //                           <tr>
    //                             <th scope="col">
    //                               В личных подсобных хозяйствах:
    //                             </th>
    //                           </tr>
    //                         </thead>
    //                         <tbody>
    //                           {result.how_to_kill.chemical.self.map((p) => {
    //                             return (
    //                               <tr>
    //                                 <th scope="row">{p}</th>
    //                               </tr>
    //                             );
    //                           })}
    //                         </tbody>
    //                       </table>
    //                     </div>
    //                   )}
    //                 </div>
    //               </div>
    //             )}
    //             {result.how_to_kill.biological && (
    //               <div className="col-md-6">
    //                 <h3>Биологические пестициды</h3>
    //                 <div className="col-md-12 row">
    //                   {result.how_to_kill.biological.veg && (
    //                     <div className="col-md-6">
    //                       <table className="table">
    //                         <thead>
    //                           <tr>
    //                             <th scope="col">Опрыскивание по вегетации:</th>
    //                           </tr>
    //                         </thead>
    //                         <tbody>
    //                           {result.how_to_kill.biological.veg.map((p) => {
    //                             return (
    //                               <tr>
    //                                 <th scope="row">{p}</th>
    //                               </tr>
    //                             );
    //                           })}
    //                         </tbody>
    //                       </table>
    //                     </div>
    //                   )}
    //                   {result.how_to_kill.biological.self && (
    //                     <div className="col-md-6">
    //                       <table className="table">
    //                         <thead>
    //                           <tr>
    //                             <th scope="col">
    //                               В личных подсобных хозяйствах:
    //                             </th>
    //                           </tr>
    //                         </thead>
    //                         <tbody>
    //                           {result.how_to_kill.biological.self.map((p) => {
    //                             return (
    //                               <tr>
    //                                 <th scope="row">{p}</th>
    //                               </tr>
    //                             );
    //                           })}
    //                         </tbody>
    //                       </table>
    //                     </div>
    //                   )}
    //                 </div>
    //               </div>
    //             )}
    //           </div>
    //         )}
    //       </div>
    //     )}
    //   </div>
    // </div>
  );
}

export default App;
