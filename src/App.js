import React, {useState} from "react";
import logo from "./logo.png";
import "./App.css";
import Button from "./components/Button/Button";
import CaseDropdown from "./components/CaseDropdown/CaseDropdown";

function App() {
  const [noun, setNoun] = useState('');
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const checkNoun = (noun) => {
    if(noun !== "") {

    } else {
      setIsError(true);
      setErrorMessage('Слово не было введено')
    }
  }

  function onClick() {
    checkNoun(noun);
  }

  return (
    <div className={"App"}>
      <header className={"header"}>
        <img className={"logo"} src={logo} alt="logo" />
        <h1>
          Просклонять существительное по падежам
        </h1>
      </header>
      <main className={"main"}>
        <form className={"input"}>
          <input
            className={"input__noun"}
            value={noun}
            id={"input-noun"}
            type="text"
            placeholder={"Введите слово в единственном числе"}
            required
            />
          <div className={"error-text"}>{errorMessage}</div>
          <div className={"select-case__wrapper"}>
            <p>Выберите падеж:</p>
            <CaseDropdown/>
          </div>
          <Button result
            onClick={onClick}
            >
            Просклонять
          </Button>
          <div className={"result__wrapper"}>
            <p className={"result__output"}>
              Результат
            </p>
          </div>
        </form>
      </main>
    </div>
  );
}

export default App;