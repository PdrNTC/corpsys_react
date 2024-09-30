import React from 'react';
import styled from 'styled-components';
import BotaoVoltar from '../BotaoVoltar';

const FormWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #1a1a1a; // Mesmo fundo da página principal
`;

const FormContainer = styled.div`
  background-color: #333;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  color: #fff;
  width: 400px;
`;

const FormTitle = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  color: #ff5252;
`;

const InputContainer = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #222;
  color: #fff;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #ff5252;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #e04040;
  }
`;

function Formulario ({ campos, titulo, onSubmit }) {

  const [formData, setFormData] = React.useState(
    campos.reduce((acc, campo) => {
      acc[campo.nome] = '';
      return acc;
    }, {})
  );

  const handleChange = (evento) => {
    const { name, value } = evento.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (evento) => {
    evento.preventDefault();
    onSubmit(formData);
    // Limpar o formulário após a submissão
    setFormData(
      campos.reduce((acc, campo) => {
        acc[campo.nome] = '';
        return acc;
      }, {})
    );
  };

  return (
    <FormWrapper>
        <FormContainer>
            <FormTitle>{titulo}</FormTitle>
            <form onSubmit={handleSubmit}>
                {campos.map((campo) => (
                <InputContainer key={campo.nome}>
                    <Label>{campo.label}:</Label>
                    <Input
                    type={campo.tipo}
                    name={campo.nome}
                    value={formData[campo.nome]}
                    onChange={handleChange}
                    required
                    />
                </InputContainer>
                ))}
                <SubmitButton type="submit">Cadastrar</SubmitButton>
                <BotaoVoltar />
            </form>
        </FormContainer>
    </FormWrapper>
  );
};

export default Formulario;
