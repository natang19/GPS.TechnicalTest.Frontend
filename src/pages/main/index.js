import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './styles.css';

export default class Main extends Component {
	render() {
		return (
			<div className="inicio">
				<Link to={'/listar'}>Listagem</Link>
				<Link to={'/buscar-cnpj'}>Buscar por CNPJ</Link>
				<Link to={'/buscar-cep'}>Buscar por Cep</Link>
			</div>
		);
	}
}
