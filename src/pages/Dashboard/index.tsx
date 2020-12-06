import React, { useState, FormEvent } from 'react';
import { FiChevronRight } from 'react-icons/fi';

import api from '../../services/api';

import { Title, Form, Repositories, Error } from './styles';
import Logo from '../../assets/Logo.svg';

interface Repository {
    full_name: string,
    description: string,
    owner:{
        login: string,
        avatar_url: string
    }
}

const Dashboard: React.FC = () => {

    const [repositories, setRepositories] = useState<Repository[]>([]);
    const [repo, setRepo] = useState("");
    const [erro, setErro] = useState("");

    async function handleAddRepositorie(e: FormEvent<HTMLFormElement>):Promise<void> {
        e.preventDefault();
        if(!repo) {
            setErro("Digite usuário/repositório!");
            return;
        }

        try{
            const response = await api.get<Repository>(`repos/${repo}`);
            const repository = response.data;
            
            setRepositories([...repositories, repository]);
            setRepo("");
            setErro("");

        }catch(err){
            setErro("Erro na busca do repositório!");
        }
        
    }

    return (
        <>
            <img src={Logo} alt="logo" />
            <Title>
                Explore repositórios no Github!
            </Title>
            <Form hasError={!!erro } onSubmit={handleAddRepositorie}>
                <input
                    value={repo} 
                    onChange={e => setRepo(e.target.value)} 
                    placeholder="Nome do repositório" 
                />
                <button>Pesquisar</button>
            </Form>

            
                { erro && <Error>{ erro }</Error>}
            <Repositories>
                {
                    repositories.map( repository => (
                        <a key={repository.full_name} href="teste">
                            <img src={repository.owner.avatar_url} alt={repository.owner.login} />

                            <div>
                                <strong>{repository.full_name}</strong>
                                <p>{repository.description}</p>
                            </div>
                            <FiChevronRight size={32} color="#a8a8b3" />
                        </a>
                    ))
                }

            </Repositories>
        </>
    );

};

export default Dashboard;