import React, { Component } from 'react';
import api from '../../services/api';
import moment from 'moment';

import './styles.css';

export default class Cep extends Component {
	state = {
		cep: '',
		carregando: false,
		nenhumDado: true,
		dados: {},
	};

	buscarPorCEP = async () => {
		const { cep } = this.state;
		if (cep === '') {
			alert('Preencha o campo de busca!');
			return;
		}

		this.setState({ carregando: true });
		await api
			.get(`/empresa/obter-pelo-cep/${cep}`)
			.then((response) => {
				if (response.data.length > 0) {
					this.setState({ dados: response.data, nenhumDado: false });
				}
			})
			.catch((error) => {
				alert(`Erro na requisição: ${error}`);
				console.warn(error);
			});
		this.setState({ carregando: false });
	};

	render() {
		const { dados, carregando, nenhumDado } = this.state;
		return (
			<div className="busca-container">
				<form className="form-busca" onSubmit={(event) => event.preventDefault()}>
					<input
						className="form-input"
						type="text"
						placeholder="Digite o CEP"
						value={this.state.cnpj}
						onChange={(event) => this.setState({ cep: event.target.value })}
					/>
					<button className="form-btn" onClick={() => this.buscarPorCEP()}>
						Buscar
					</button>
				</form>
				{carregando && (
					<div>
						<h2 className="carregando">Carregando...</h2>
					</div>
				)}
				{nenhumDado && (
					<div>
						<h1 className="nenhum-item-cep">Nenhuma empresa encontrada para esse cep</h1>
					</div>
				)}
				{!nenhumDado && (
					<div className="busca-info">
							<span>
								<strong>Nome:</strong> {dados.nome}
							</span>
							<span>
								<strong>Nome fantasia:</strong> {dados.fantasia}
							</span>
							<span>
								<strong>CNPJ:</strong> {dados.cnpj}
							</span>
							<span>
								<strong>CEP:</strong> {dados.cep}
							</span>
					</div>
				)}
			</div>
		);
	}
}
