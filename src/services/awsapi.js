import Axios from 'axios';

const awsapi = Axios.create({
	baseURL: 'https://cors-anywhere.herokuapp.com/https://www.receitaws.com.br/v1/',
});

export default awsapi;
