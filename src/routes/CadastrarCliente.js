import axios from "axios";
import Formulario from '../components/Formulario';

function CadastrarCliente() {
    // Campos a serem enviados ao formulário //
    const campos = [
        { nome: 'nome', label: 'Nome', tipo: 'text' },
        { nome: 'email', label: 'Email', tipo: 'email' },
        { nome: 'telefone', label: 'Telefone', tipo: 'text' },
    ];

    const handleSubmit = async (dados) => {
        try {
            const response = await axios.post('https://pedrohs.pythonanywhere.com/clientes/', dados);
            console.log('Cliente cadastrado com sucesso:', response.data);
            alert('Cliente cadastrado com sucesso no banco de dados!');
          } catch (error) {
            console.error('Erro ao cadastrar cliente:', error);
            alert('Erro de conexão com a API.');
          }
    };

    return (
        <div>
            <Formulario 
                campos={campos} 
                titulo="Cadastro de Clientes" 
                onSubmit={handleSubmit} 
            />
        </div>
    );
}

export default CadastrarCliente;