import React, { useState } from "react";
import "./CaseDropdown.css"

function CaseDropdown() {
  const selectOptions = [
    'Именительный',
    'Родительный',
    'Дательный',
    'Винительный',
    'Творительный',
    'Предложный'
  ];
  const [value, setValue] = useState('');

  const options = selectOptions.map((text, index) => {
    return <option key={index}>{text}</option>;
  });

  return <div>
    <select className={"selector"} value={value} required name="cases" onChange={
      (event) => setValue(event.target.value)
    }>
      {options}
    </select>
  </div>;
}

export default CaseDropdown;