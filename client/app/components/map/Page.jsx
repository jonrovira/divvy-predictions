import React from 'react';
import $ from 'jquery';
import Layout from './Layout.jsx';

export default class Page extends React.Component {



	constructor(props) {
		super(props);
		this.state = {
			data: [],
			activeStationId: '',
			temperature: '',
			dewPoint: '',
			humidity: '',
			windSpeed: ''
		};
		this.setActiveStationId = this.setActiveStationId.bind(this);
	}



	componentDidMount() {
		let _ = this;
		$.get('https://divvy-ml.herokuapp.com/divvyPredictions/api/v1.0/predictions', function (result) {
		// $.get('http://127.0.0.1:5000/divvyPredictions/api/v1.0/predictions', function (result) {
			_.setState({ data: result.predictions });
		});
		$.get('https://divvy-ml.herokuapp.com/divvyPredictions/api/v1.0/forecast', function (result) {
		// $.get('http://127.0.0.1:5000/divvyPredictions/api/v1.0/forecast', function (result) {
			_.setState({
				temperature: result.forecast.currently.temperature,
				dewPoint: result.forecast.currently.dewPoint,
				humidity: result.forecast.currently.humidity,
				windSpeed: result.forecast.currently.windSpeed
			});
		});
	}



	setActiveStationId(id) {
		this.setState({ activeStationId: id });
	}




	render() {
		return <Layout
			data={this.state.data}
			activeStationId={this.state.activeStationId}
			setActiveStationId={this.setActiveStationId}
			temperature={this.state.temperature}
			dewPoint={this.state.dewPoint}
			humidity={this.state.humidity}
			windSpeed={this.state.windSpeed} />;
	}



};