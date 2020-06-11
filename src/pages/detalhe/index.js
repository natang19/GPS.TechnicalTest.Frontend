import React, { Component } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import moment from 'moment';

import './styles.css';

export default class Detalhe extends Component {
	state = {
		id: '',
		detalhes: {},
		carregando: true,
	};

	componentDidMount() {
		const { id } = this.props.match.params;
		this.setState({ id });

		this.obtemDetalhes(id);
	}

	obtemDetalhes = async (id) => {
		await api
			.get(`/empresa/${id}`)
			.then((response) => {
				this.setState({ detalhes: response.data });
			})
			.catch((error) => {
				alert(`Erro na requisição: ${error}`);
				console.warn(error);
			});
		this.setState({ carregando: false });
	};

	excluir = async () => {
		const { id } = this.state;
		await api
			.delete(`empresa/${id}`)
			.then((response) => {
				alert('Deletado com sucesso!');
				this.props.history.push('/listar');
			})
			.catch((error) => {
				this.props.history.push('/listar');
			});
	};

	render() {
		const { detalhes, carregando } = this.state;
		return (
			<div>
				<Link className="voltar-btn" to={'/listar'}>
					Voltar
				</Link>
				{carregando && (
					<div>
						<h1 className="carregando">Carregando...</h1>
					</div>
				)}

				{!carregando && (
					<div className="detalhes">
						<div className="content">
							<span>
								<strong>Nome:</strong> {detalhes.nome}
							</span>
							<span>
								<strong>UF:</strong> {detalhes.uf}
							</span>
							<span>
								<strong>Telefone:</strong> {detalhes.telefone}
							</span>
							<span>
								<strong>Situacao:</strong> {detalhes.situacao}
							</span>
							<span>
								<strong>Bairro:</strong> {detalhes.bairro}
							</span>
							<span>
								<strong>Endereço:</strong> {detalhes.logradouro} - {detalhes.complemento}
							</span>
							<span>
								<strong>Numero:</strong> {detalhes.numero}
							</span>
							<span>
								<strong>CEP:</strong> {detalhes.cep}
							</span>
							<span>
								<strong>Abertura:</strong> {detalhes.abertura}
							</span>
							<span>
								<strong>Natureza Juridica:</strong> {detalhes.natureza_juridica}
							</span>
							<span>
								<strong>CNPJ:</strong> {detalhes.cnpj}
							</span>
							<span>
								<strong>Data da última Atualização:</strong>{' '}
								{moment(detalhes.ultima_atualizao).format('DD/MM/YYYY')}
							</span>
							<span>
								<strong>Tipo:</strong> {detalhes.tipo}
							</span>
							<span>
								<strong>E-mail:</strong> {detalhes.email}
							</span>
							<span>
								<strong>Capital social:</strong> {detalhes.capital_social}
							</span>
						</div>
						<div className="btn">
							<button onClick={() => this.excluir()}>Exluir</button>
						</div>
					</div>
				)}
			</div>
		);
	}
}
