import React from "react";
import ReactDOM from "react-dom";
import ControlledOpenSelect from "./ControlledOpenSelect";
import { getLocaisVacinacaoRecife } from "./data";

function App() {
  const [locaisVacinacaoRecife, setLocaisVacinacaoRecife] = React.useState([]);

  // criar array com os nomes dos bairros sem repetição

  React.useEffect(function () {
    const locaisVacinacao = getLocaisVacinacaoRecife();

    const bairros = [];

    locaisVacinacao.forEach(function (local) {
      if (bairros.includes(local.bairro));
      else bairros.push(local.bairro);
    });

    console.log(bairros);

    setLocaisVacinacaoRecife(getLocaisVacinacaoRecife());
  }, []);

  return (
    <>
      <h1>Componente App</h1>

      <ControlledOpenSelect />

      {locaisVacinacaoRecife.map((local) => (
        <h6> {local.bairro} </h6>
      ))}
    </>
  );
}

ReactDOM.render(<App />, window.document.getElementById("root"));
