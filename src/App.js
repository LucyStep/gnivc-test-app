import React, {useState} from "react";
import logo from "./logo.png";
import "./App.css";
import Button from "./components/Button/Button";
import Morpher from "morpher-ws3-client";

function App() {
  const [noun, setNoun] = useState('');
  const [value, setValue] = useState('');
  const [isNounError, setNounIsError] = useState(false);
  const [errorNounMessage, setNounErrorMessage] = useState('');
  const [isCaseError, setCaseIsError] = useState(false);
  const [errorCaseMessage, setCaseErrorMessage] = useState('');
  const [isSelected, setIsSelected] = useState(false);
  const [caseResult, setCaseResult] = useState('');

  const options = [
    {label: "Выберите падеж", value: ""},
    {label: "Именительный - Кто? Что?", value: "nominative"},
    {label: "Родительный - Кого? Чего?", value: "genitive"},
    {label: "Дательный - Кому? Чему?", value: "dative"},
    {label: "Винительный - Кого? Что?", value: "accusative"},
    {label: "Творительный - Кем? Чем?", value: "instrumental"},
    {label: "Предложный - О ком? О чем?", value: "prepositional"},
    {label: "Все падежи сразу", value: "allCases"}
  ];

  const changeCase = (str) => {
    const morpher = new Morpher();
    morpher.russian.declension(str).then(
      result => {
        if (value === "nominative") {
          setIsSelected(true);
          setCaseResult(noun);
        } else if (value === "genitive") {
          setIsSelected(true);
          setCaseResult(result['родительный']);
        } else if (value === "dative") {
          setIsSelected(true);
          setCaseResult(result['дательный']);
        } else if (value === "accusative") {
          setIsSelected(true);
          setCaseResult(result['винительный']);
        } else if (value === "instrumental") {
          setIsSelected(true);
          setCaseResult(result['творительный']);
        } else if (value === "prepositional") {
          setIsSelected(true);
          setCaseResult(result['предложный']);
        } else {
          setIsSelected(true);
          setCaseResult(
            `Именительный: ${noun}\n
            Родительный: ${result['родительный']}\n
            Дательный: ${result['дательный']}\n
            Винительный: ${result['винительный']}\n
            Творительный: ${result['творительный']}\n
            Предложный: ${result['предложный']}`
          );
        }
      }
    )
  };

  const checkSelectedCase = (value) => {
    if (value === "") {
      setCaseIsError(true);
      setCaseErrorMessage('Падеж не выбран');
    }
  }

  const checkNoun = (noun) => {
    if (noun === "") {
      setNounIsError(true);
      setNounErrorMessage('Слово не было введено');
    }
  }

  function onClick() {
    checkNoun(noun);
    checkSelectedCase(value);
    changeCase(noun);
  }

  return (
    <div className={"App"}>
      <header className={"header"}>
        <img className={"logo"} src={logo} alt="logo"/>
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
            onChange={e => setNoun(e.target.value)}
          />
          <div className={"error-text"}>{errorNounMessage}</div>
          <select
            className={"selector"}
            name="option"
            required
            value={value}
            onChange={e => setValue(e.currentTarget.value)}
          >
            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
              >
                {option.label}
              </option>
            ))}
          </select>
          <div className={"error-text"}>{errorCaseMessage}</div>
          <Button result
                  onClick={onClick}
          >
            Просклонять
          </Button>
          <div className={"result__wrapper"}>
            <span>{caseResult}</span>
          </div>
        </form>
      </main>
    </div>
  );
}

export default App;