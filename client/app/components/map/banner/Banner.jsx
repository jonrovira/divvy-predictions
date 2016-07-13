import React from 'react';

export default class Banner extends React.Component {



	constructor(props) {
		super(props);

		let d = new Date();
		let localOff = -(d.getTimezoneOffset() / 60);
		let targetOff = -5;
		let deltaOff = targetOff - localOff;

		this.state = {
			date: new Date(new Date().getTime() + deltaOff * 3600 * 1000)
		};
	}



	render() {
		return (
			<section className="banner">
				<ul>
					<li>
						<span>{this.state.date.toLocaleDateString()}</span>
						<h6>Date</h6>
					</li>
					<li>
						<span>{this.state.date.toLocaleTimeString()}</span>
						<h6>Chicago Time</h6>
					</li>
					<li>
						<span>{this.props.temperature} &deg;F</span>
						<h6>Temperature</h6>
					</li>
					<li>
						<span>{this.props.dewPoint} &deg;F</span>
						<h6>Dew Point</h6>
					</li>
					<li>
						<span>{this.props.humidity}%</span>
						<h6>Humidity</h6>
					</li>
					<li>
						<span>{this.props.windSpeed} mph</span>
						<h6>Wind Speed</h6>
					</li>
				</ul>
			</section>
		);
	}



};



Banner.PropTypes = {
	temperature: React.PropTypes.number.isRequired,
	dewPoint: React.PropTypes.number.isRequired,
	humidity: React.PropTypes.number.isRequired,
	windSpeed: React.PropTypes.number.isRequired
};