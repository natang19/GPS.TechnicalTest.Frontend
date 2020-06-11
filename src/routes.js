import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Main from './pages/main';
import Lista from './pages/listar';
import Detalhe from './pages/detalhe';
import CNPJ from './pages/cnpj';
import Cep from './pages/cep';

const Routes = () => (
	<BrowserRouter>
		<Switch>
			<Route exact path="/" component={Main} />
			<Route exact path="/listar" component={Lista} />
			<Route exact path="/detalhe/:id" component={Detalhe} />
			<Route exact path="/buscar-cep" component={Cep} />
			<Route exact path="/buscar-cnpj" component={CNPJ} />
		</Switch>
	</BrowserRouter>
);

export default Routes;
