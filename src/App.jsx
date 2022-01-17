import React from "react";
import ReactDOM from "react-dom";
import ControlledOpenSelect from "./ControlledOpenSelect";
import { getLocaisVacinacaoRecife } from "./data";

function App() {
  const [locaisVacinacaoRecife, setLocaisVacinacaoRecife] = React.useState([]);

  const [bairros, setBairros] = React.useState([]);

  function extrairBairrosUnicos() {
    let bairrosAux = [];

    getLocaisVacinacaoRecife().forEach(function (localVacinacao) {
      if (bairrosAux.includes(localVacinacao.bairro));
      else bairrosAux = [...bairrosAux, localVacinacao.bairro];
    });

    return bairrosAux;
  }

  // criar array com os nomes dos bairros sem repetição

  React.useEffect(function () {
    setBairros(extrairBairrosUnicos());

    setLocaisVacinacaoRecife(getLocaisVacinacaoRecife());
  }, []);

  return (
    <>
      <h1>Componente App</h1>

      <ControlledOpenSelect />

      {bairros.map((bairro) => (
        <h6> {bairro} </h6>
      ))}
    </>
  );
}

ReactDOM.render(<App />, window.document.getElementById("root"));
