import styled from "styled-components";
import { useNavigate } from 'react-router-dom';

const BackButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #ff5252;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
  margin-top: 15px;

  &:hover {
    background-color: #e04040;
  }
`;

function BotaoVoltar() {
    const navigate = useNavigate();
    return(
        <BackButton type="button" onClick={() => navigate('/')}>Voltar ao Menu</BackButton>
    );
}

export default BotaoVoltar;