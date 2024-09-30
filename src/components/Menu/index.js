import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Botao from "../Botao";

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f0f0;
`;

const TituloMenu = styled.h2`
    font-size: 32px;
`

function Menu() {
    const navigate = useNavigate();

    return (
        <MenuContainer>
            <TituloMenu>Menu</TituloMenu>
            <Botao texto="Cadastro de Cliente" onClick={() => navigate('/cadastrar-cliente')} />
            <Botao texto="Cadastro de Vendedor" onClick={() => navigate('/cadastrar-vendedor')} />
            <Botao texto="Cadastrar Produto" onClick={() => navigate('/cadastrar-produto')} />
            <Botao texto="Exibir Relatório" onClick={() => navigate('/exibir-relatorio')} />
            <Botao texto="Cadastro de Grupo Produto" onClick={() => navigate('/cadastrar-grupo-produto')} />
        </MenuContainer>
    );
}

export default Menu;