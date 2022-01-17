import React from "react";
import ReactDOM from "react-dom";
import ControlledOpenSelect from "./ControlledOpenSelect";
import { getLocaisVacinacaoRecife } from "./data";

function App() {
  const [locaisVacinacaoRecife, setLocaisVacinacaoRecife] = React.useState([]);

  const [bairros, setBairros] = React.useState([]);

  // criar array com os nomes dos bairros sem repetição

  React.useEffect(function () {
    const locaisVacinacao = getLocaisVacinacaoRecife();

    let bairrosAux = [];

    locaisVacinacao.forEach(function (localVacinacao) {
      if (bairrosAux.includes(localVacinacao.bairro)) {
        // não está entrando aqui, por que ?????
        console.log("contem");
      } else {
        bairrosAux = [...bairrosAux, localVacinacao.bairro];
      }
    });

    setBairros(bairrosAux);

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
