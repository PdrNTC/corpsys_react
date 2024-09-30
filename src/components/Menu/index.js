import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

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
`;

const MenuItem = styled.div`
  position: relative;
  margin: 10px;
`;

const SubMenu = styled.div`
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #fff;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  z-index: 1;
  ${MenuItem}:hover & {
    display: block;
  }
`;

const SubMenuItem = styled.button`
  padding: 10px;
  width: 150px;
  text-align: left;
  border: none;
  background-color: #3A6D8C;
  cursor: pointer;
  &:hover {
    background-color: #e0e0e0;
  }
`;

function Menu() {
    const navigate = useNavigate();

    return (
        <MenuContainer>
            <TituloMenu>Menu</TituloMenu>
            <MenuItem>
                <SubMenuItem onClick={() => navigate('/cadastrar-cliente')}>Cliente</SubMenuItem>
                <SubMenu>
                    <SubMenuItem onClick={() => navigate('/exibir-clientes')}>Exibir Clientes</SubMenuItem>
                    <SubMenuItem onClick={() => navigate('/cadastrar-cliente')}>Cadastrar Cliente</SubMenuItem>
                </SubMenu>
            </MenuItem>
                <MenuItem>
                    <SubMenuItem onClick={() => navigate('/cadastrar-vendedor')}>Vendedor</SubMenuItem>
                <SubMenu>
                    <SubMenuItem onClick={() => navigate('/exibir-vendedores')}>Exibir Vendedores</SubMenuItem>
                    <SubMenuItem onClick={() => navigate('/cadastrar-vendedor')}>Cadastrar Vendedor</SubMenuItem>
                </SubMenu>
            </MenuItem>
            <MenuItem>
                <SubMenuItem onClick={() => navigate('/cadastrar-grupo-produto')}>Grupo de Produto</SubMenuItem>
            <SubMenu>
                <SubMenuItem onClick={() => navigate('/exibir-grupo-produtos')}>Exibir Grupos</SubMenuItem>
                <SubMenuItem onClick={() => navigate('/cadastrar-grupo-produto')}>Cadastrar Grupo</SubMenuItem>
            </SubMenu>
            </MenuItem>
            <MenuItem>
                <SubMenuItem onClick={() => navigate('/cadastrar-produto')}>Produto</SubMenuItem>
            <SubMenu>
                <SubMenuItem onClick={() => navigate('/exibir-produtos')}>Exibir Produtos</SubMenuItem>
                <SubMenuItem onClick={() => navigate('/cadastrar-produto')}>Cadastrar Produto</SubMenuItem>
            </SubMenu>
            </MenuItem>
            <MenuItem>
                <SubMenuItem onClick={() => navigate('/exibir-relatorio')}>Exibir Relatório</SubMenuItem>
            </MenuItem>
        </MenuContainer>
    );
}

export default Menu;