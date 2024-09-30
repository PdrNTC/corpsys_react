import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import logo from "../../imgs/logo_corpsys.png";


const MenuContainer = styled.div`
  background-color: #1a1a1a;
  color: #fff;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 50px;
`;

const Logo = styled.img`
  width: 300px;
  height: auto;
  margin-bottom: 20px;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #1a1a1a;
`;

const MenuItem = styled.div`
  position: relative;
  margin: 0 15px;
  padding: 10px 15px;
  cursor: pointer;
  font-size: 18px;
  transition: color 0.3s;
  &:hover {
    color: #ff5252;
  }

  &:hover > div {
    display: block;
  }
`;

const SubMenu = styled.div`
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #333;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  z-index: 1;
`;

const SubMenuItem = styled.div`
  font-weight: 700;
  padding: 10px 15px;
  color: #fff;
  white-space: nowrap;
  transition: background-color 0.3s;
  &:hover {
    background-color: #ff5252;
  }
`;

function Menu() {
    const navigate = useNavigate();

    return (
        <MenuContainer>
            <Logo src={logo} alt="logo da corpsystem" />
            <Nav> 
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
                    <SubMenuItem onClick={() => navigate('/vendas')}>Vendas</SubMenuItem>
                <SubMenu>
                    <SubMenuItem onClick={() => navigate('/vendas')}>Cadastrar Venda</SubMenuItem>
                    <SubMenuItem onClick={() => navigate('/vendas-efetuadas')}>Relatório de Venda</SubMenuItem>
                </SubMenu>
                </MenuItem>
                
            </Nav>
        </MenuContainer>
    );
}

export default Menu;