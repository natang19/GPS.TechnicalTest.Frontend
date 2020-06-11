import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

import './styles.css';

export default class Main extends Component {
	state = {
		empresas: [],
		nenhumDado: true,
	};

	componentDidMount() {
		this.listar();
	}

	listar = async () => {
		await api
			.get('empresa/obter-todos')
			.then((response) => {
				if (response.data.length > 0) {
					this.setState({ empresas: response.data, nenhumDado: false });
				}
			})
			.catch((error) => {
				alert(`Erro na requisição: ${error}`);
				console.warn(error);
			});
	};

	detalhes = () => {};

	render() {
		const { empresas, nenhumDado } = this.state;
		return (
			<div>
				{nenhumDado && (
					<div>
						<h1 className="nenhum-item-lista">Nenhum item cadastrado!</h1>
					</div>
				)}
				{!nenhumDado && (
					<ul className="lista">
						{empresas.map((item) => (
							<Link className="lista-item" to={`/detalhe/${item.id}`} key={item.id}>
								<span>
									<strong>Nome:</strong> {item.nome}
								</span>
								<span>
									<strong>Nome fantasia:</strong> {item.fantasia}
								</span>
								<span>
									<strong>CNPJ:</strong> {item.cnpj}
								</span>
								<span>
									<strong>CEP:</strong> {item.cep}
								</span>
							</Link>
						))}
					</ul>
				)}
			</div>
		);
	}
}
