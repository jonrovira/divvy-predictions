import React from 'react';
import $ from 'jquery';
import Layout from './Layout.jsx';

export default class Page extends React.Component {



	constructor(props) {
		super(props);
		this.state = {
			predictions: [],
			forecast: {},
			activeStationId: -1
		};
		this.setActiveStationId = this.setActiveStationId.bind(this);
	}



	componentDidMount() {
		let _ = this;
		// $.get('https://divvy-ml.herokuapp.com/divvyPredictions/api/v1.0/predictions', function (result) {
		$.get('http://127.0.0.1:5000/divvyPredictions/api/v1.0/predictions', function (result) {
			_.setState({ predictions: result.predictions });
		});
		// $.get('https://divvy-ml.herokuapp.com/divvyPredictions/api/v1.0/forecast', function (result) {
		$.get('http://127.0.0.1:5000/divvyPredictions/api/v1.0/forecast', function (result) {
			_.setState({ forecast: result.forecast.currently });
		});
	}



	setActiveStationId(id) {
		this.setState({ activeStationId: id });
	}




	render() {
		return <Layout
			predictions={this.state.predictions}
			forecast={this.state.forecast}
			activeStationId={this.state.activeStationId}
			setActiveStationId={this.setActiveStationId} />;
	}



};