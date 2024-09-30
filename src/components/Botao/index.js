import styled from "styled-components";
import React from "react";

const Button = styled.button`
  padding: 10px 20px;
  margin: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #45a049;
  }
`

function Botao({ texto, evento }) {
    return (
        <Button onClick={evento}>{texto}</Button>
    );
}

export default Botao;