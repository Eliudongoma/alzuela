import React from "react";
import { Input, InputProps } from "@chakra-ui/react";

interface Props extends InputProps {
  onChangeText: (text: string) => void;
}

const FormInput = ({ onChangeText, ...inputProps }: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    onChangeText(e.target.value);
  };
  return (
    <Input type="text" fontSize={20} onChange={handleChange} {...inputProps} />
  );
};

export default FormInput;
