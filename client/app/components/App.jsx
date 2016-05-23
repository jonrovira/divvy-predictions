import React from 'react';
import $ from 'jquery';
import Map from './Map.jsx';

export default class App extends React.Component {



	constructor(props) {
		super(props);
		this.state = {
			data: []
		}
	}



	componentDidMount() {
		let _ = this;
		$.get('http://127.0.0.1:5000/', function (result) {
			_.setState({ data: result });
		})
	}




	render() {
		return <Map
			data={this.state.data}/>;
	}



};