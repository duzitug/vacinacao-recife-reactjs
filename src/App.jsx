import React from "react";
import ReactDOM from "react-dom";
import ControlledOpenSelect from "./ControlledOpenSelect";
import { getTodosLocaisVacinacaoRecife } from "./data";

function App() {
  const [todosLocaisVacinacao, setTodosLocaisVacinacao] = React.useState([]);

  const [
    locaisVacinacaoPorBairro,
    setLocaisVacinacaoPorBairro
  ] = React.useState([]);

  const [bairros, setBairros] = React.useState([]);

  const [bairro, setBairro] = React.useState("");

  function extrairBairrosUnicosEOrdenar() {
    let bairrosAux = [];

    getTodosLocaisVacinacaoRecife().forEach(function (localVacinacao) {
      if (bairrosAux.includes(localVacinacao.bairro));
      else bairrosAux = [...bairrosAux, localVacinacao.bairro];
    });

    return bairrosAux.sort();
  }

  function getLocaisVacinacaoPorBairro() {
    const locaisVacinacaoPorBairro = [];

    todosLocaisVacinacao.forEach(function (localVacinacao) {
      if (localVacinacao.bairro === bairro)
        locaisVacinacaoPorBairro.push(localVacinacao);
    });

    return locaisVacinacaoPorBairro;
  }

  // criar array com os nomes dos bairros sem repetição

  React.useEffect(function setInitialData() {
    setBairros(extrairBairrosUnicosEOrdenar());

    setTodosLocaisVacinacao(getTodosLocaisVacinacaoRecife());
  }, []);

  React.useEffect(
    function () {
      console.log(getLocaisVacinacaoPorBairro());
    },
    [bairro]
  );

  return (
    <>
      <h1>Componente App</h1>

      <ControlledOpenSelect
        bairros={bairros}
        bairro={bairro}
        setBairro={setBairro}
      />

      {bairro}
    </>
  );
}

ReactDOM.render(<App />, window.document.getElementById("root"));
