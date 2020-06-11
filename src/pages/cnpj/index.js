import React, { Component } from 'react';
import awsapi from '../../services/awsapi';
import api from '../../services/api';
import moment from 'moment';

import './styles.css';

export default class CNPJ extends Component {
	state = {
		cnpj: '',
		carregando: false,
		nenhumDado: true,
		dados: {},
	};

	buscarPorCNPJ = async () => {
		const { cnpj } = this.state;
		if (cnpj === '') {
			alert('Preencha o campo de busca!');
			return;
		}

		this.setState({ carregando: true });
		await awsapi
			.get(`/cnpj/${cnpj}`)
			.then((response) => {
				const {
					atividade_principal,
					atividades_secundarias,
					billing,
					qsa,
					extra,
					abertura,
					data_situacao,
					capital_social,
					ultima_atualizacao,
					numero,
					...dados
				} = response.data;

				const data_abertura = moment(abertura, 'DD/MM/YYYY').format('YYYY/MM/DD');
				const situacao = moment(data_situacao, 'DD/MM/YYYY').format('YYYY/MM/DD');
				const atualizacao = moment(ultima_atualizacao).format('YYYY/MM/DD');
				const capital = parseFloat(capital_social);
				const numero_endereco = parseInt(numero);

				const model = {
					...dados,
					abertura: data_abertura,
					data_situacao: situacao,
					ultima_atualizacao: atualizacao,
					capital_social: capital,
					numero: numero_endereco,
				};

				this.setState({ dados: model, carregando: false, nenhumDado: false });
			})
			.catch((error) => {
				alert(`Erro na requisição: ${error}`);
				console.warn(error);
			});
		this.setState({ carregando: false });
	};

	salvar = async () => {
		const { dados } = this.state;
		await api
			.post('empresa', dados)
			.then((response) => {
				if (response.status) {
					alert('Salvo com sucesso!');
				}
			})
			.catch((error) => {
				alert(
					`Erro na requisição: ${error.response.data.errors.map((item) => {
						return item;
					})}`
				);
				console.warn(error);
			});
	};

	render() {
		const { dados, carregando, nenhumDado } = this.state;
		return (
			<div className="busca-container">
				<form className="form-busca" onSubmit={(event) => event.preventDefault()}>
					<input
						className="form-input"
						type="text"
						placeholder="Digite o CNPJ"
						value={this.state.cnpj}
						onChange={(event) => this.setState({ cnpj: event.target.value })}
					/>
					<button className="form-btn" onClick={() => this.buscarPorCNPJ()}>
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
						<h1 className="nenhum-item-cnpj">Nenhuma empresa encontrada para com esse CNPJ</h1>
					</div>
				)}
				{!nenhumDado && (
					<div className="busca-info">
						<div className="content">
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
						<div className="btn">
							<button onClick={() => this.salvar()}>Salvar</button>
						</div>
					</div>
				)}
			</div>
		);
	}
}
