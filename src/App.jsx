import React from "react";
import ReactDOM from "react-dom";
import OpenSelectBairros from "./OpenSelectBairros";
import { getTodosLocaisVacinacaoRecife } from "./data";
import CardLocalVacinacao from "./CardLocalVacinacao";

function App() {
  const [todosLocaisVacinacao, setTodosLocaisVacinacao] = React.useState([]);

  const [
    locaisVacinacaoPorBairro,
    setLocaisVacinacaoPorBairro
  ] = React.useState([]);

  const [listaBairro, setListaBairro] = React.useState([]);

  const [bairro, setBairro] = React.useState();

  function extrairBairrosUnicosEOrdenar() {
    let listaBairroAux = [];

    getTodosLocaisVacinacaoRecife().forEach(function (localVacinacao) {
      if (listaBairroAux.includes(localVacinacao.bairro));
      else listaBairroAux = [...listaBairroAux, localVacinacao.bairro];
    });

    return listaBairroAux.sort();
  }

  function getLocaisVacinacaoPorBairro() {
    // por que o locaisVacinacaoPorBairro não está
    // sendo setado para um array vazio ???

    todosLocaisVacinacao.forEach(function (localVacinacao) {
      if (localVacinacao.bairro === bairro)
        // locaisVacinacaoPorBairro.push(localVacinacao);
        setLocaisVacinacaoPorBairro(function (estadoAnterior) {
          return [...estadoAnterior, localVacinacao];
        });
    });

    return locaisVacinacaoPorBairro;
  }

  // criar array com os nomes dos listaBairro sem repetição

  React.useEffect(function setInitialData() {
    setListaBairro(extrairBairrosUnicosEOrdenar());

    setTodosLocaisVacinacao(getTodosLocaisVacinacaoRecife());
  }, []);

  //Por que há um sincronismo entre os efeitos ??

  React.useEffect(
    // altera o estado de locaisVacinacaoPorBairro para um array vazio
    // sempre que um novo bairro é selecionado
    function () {
      setLocaisVacinacaoPorBairro([]);
    },
    [bairro]
  );

  React.useEffect(
    // chama a função getLocaisVacinacaoPorBairro sempŕe que o estado locaisVacinacaoPorBairro
    // é alterado e o estado locaisVacinacaoPorBairro é um array vazio
    function abc() {
      // sem este if entra em loop infinito, por que??
      if (locaisVacinacaoPorBairro.length === 0) getLocaisVacinacaoPorBairro();
    },
    [locaisVacinacaoPorBairro]
  );

  return (
    <>
      <h1>Componente App</h1>

      <OpenSelectBairros
        listaBairro={listaBairro}
        bairro={bairro}
        setBairro={setBairro}
      />

      {bairro}

      {/* {locaisVacinacaoPorBairro.length === 0 && "NÂO tem local"} */}

      {locaisVacinacaoPorBairro.map((localVacinacao, index) => (
        <CardLocalVacinacao
          key={index}
          local={localVacinacao.Local}
          logradouro={localVacinacao.logradouro}
          bairro={localVacinacao.bairro}
          horario={localVacinacao.horario}
        />
      ))}
    </>
  );
}

ReactDOM.render(<App />, window.document.getElementById("root"));
