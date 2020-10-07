import {ChangeEvent, useState} from "react";

const useTextInput = () => {
  const [value, _setValue] = useState('');

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    _setValue(e.target.value)
  };

  return {
    value,
    onChange
  }
};

export default useTextInput
