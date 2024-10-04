import axios from "axios";
import Formulario from '../components/Formulario';

function CadastrarVendedores() {
    // Campos a serem enviados ao formulário //
    const campos = [
        { nome: 'nome', label: 'Nome', tipo: 'text' },
        { nome: 'email', label: 'Email', tipo: 'email' },
    ];

    const handleSubmit = async (dados) => {
        try {
            const response = await axios.post('https://pedrohs.pythonanywhere.com/vendedores/', dados);
            console.log('Vendedor cadastrado com sucesso:', response.data);
            alert('Vendedor cadastrado com sucesso no banco de dados!');
          } catch (error) {
            console.error('Erro ao cadastrar Vendedor:', error);
            alert('Erro de conexão com a API.');
          }
    };

    return (
        <div>
            <Formulario 
                campos={campos} 
                titulo="Cadastro de Vendedores" 
                onSubmit={handleSubmit} 
            />
        </div>
    );
}

export default CadastrarVendedores;