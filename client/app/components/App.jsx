import React from 'react';
import $ from 'jquery';
import Layout from './Layout.jsx';

export default class App extends React.Component {



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
		// $.get('https://divvy-ml.herokuapp.com/predictions', function (result) {
		$.get('http://127.0.0.1:5000/predictions', function (result) {
			_.setState({ data: result });
		});
		// $.get('https://divvy-ml.herokuapp.com/forecast', function (result) {
		$.get('http://127.0.0.1:5000/forecast', function (result) {
			_.setState({
				temperature: result["currently"].temperature,
				dewPoint: result["currently"].dewPoint,
				humidity: result["currently"].humidity,
				windSpeed: result["currently"].windSpeed
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