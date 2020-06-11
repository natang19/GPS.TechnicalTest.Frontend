import Axios from 'axios';

const api_dev = 'https://localhost:5001/api';
const api_prod = 'https://gpstesteapi.azurewebsites.net/api';

const api = Axios.create({
	baseURL: api_prod,
	headers: {},
});

export default api;
