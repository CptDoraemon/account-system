import React from "react";

interface TextInputProps {
  value: string,
  setValue: (value: string) => void,
  placeholderText: string,
  id?: string,
  type?: 'password'
}

const TextInput: React.FC<TextInputProps> = ({value, setValue, placeholderText, id, type}) => {

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  };

  return (
    <input value={value} onChange={changeHandler} placeholder={placeholderText} id={id} type={type || 'text'}/>
  )
};

export default TextInput
