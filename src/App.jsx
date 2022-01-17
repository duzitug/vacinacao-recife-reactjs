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

  const [listaBairro, setListaBairro] = React.useState([]);

  const [bairro, setBairro] = React.useState("");

  function extrairBairrosUnicosEOrdenar() {
    let listaBairroAux = [];

    getTodosLocaisVacinacaoRecife().forEach(function (localVacinacao) {
      if (listaBairroAux.includes(localVacinacao.bairro));
      else listaBairroAux = [...listaBairroAux, localVacinacao.bairro];
    });

    return listaBairroAux.sort();
  }

  function getLocaisVacinacaoPorBairro() {
    const locaisVacinacaoPorBairro = [];

    todosLocaisVacinacao.forEach(function (localVacinacao) {
      if (localVacinacao.bairro === bairro)
        locaisVacinacaoPorBairro.push(localVacinacao);
    });

    return locaisVacinacaoPorBairro;
  }

  // criar array com os nomes dos listaBairro sem repetição

  React.useEffect(function setInitialData() {
    setListaBairro(extrairBairrosUnicosEOrdenar());

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
        listaBairro={listaBairro}
        bairro={bairro}
        setBairro={setBairro}
      />

      {bairro}
    </>
  );
}

ReactDOM.render(<App />, window.document.getElementById("root"));
