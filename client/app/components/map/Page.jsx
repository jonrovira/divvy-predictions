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

		let predictionRequestInterval = setInterval(function () {
			$.get('https://divvy-ml.herokuapp.com/divvyPredictions/api/v1.0/predictions', function (result) {
			// $.get('http://127.0.0.1:5000/divvyPredictions/api/v1.0/predictions', function (result) {
				if (result.predictions !== null) {
					clearInterval(predictionRequestInterval);
					_.setState({ predictions: result.predictions });
				} else {
					console.log("haven't received predictions... polling.");
				}
			});
		}, 1000);

		let forecastRequestInterval = setInterval(function () {
			$.get('https://divvy-ml.herokuapp.com/divvyPredictions/api/v1.0/forecast', function (result) {
			// $.get('http://127.0.0.1:5000/divvyPredictions/api/v1.0/forecast', function (result) {
				if (result.forecast !== null) {
					clearInterval(forecastRequestInterval);
					_.setState({ forecast: result.forecast.currently });
				} else {
					console.log("haven't received forecast... polling.");
				}
			});
		}, 1000);
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