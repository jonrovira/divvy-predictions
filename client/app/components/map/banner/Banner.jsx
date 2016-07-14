import React from 'react';

export default class Banner extends React.Component {



	getChicagoDate() {
		let localOffset = -(new Date().getTimezoneOffset() / 60);
		let chicagoOffset = -5;
		let difference = chicagoOffset - localOffset;
		return new Date(new Date().getTime() + difference * 3600 * 1000);
	}



	render() {
		return (
			<section className="banner">
				<ul>
					<li>
						<span>{this.getChicagoDate().toLocaleDateString()}</span>
						<h6>Date</h6>
					</li>
					<li>
						<span>{this.getChicagoDate().toLocaleTimeString()}</span>
						<h6>Chicago Time</h6>
					</li>
					<li>
						<span>{this.props.forecast.temperature} &deg;F</span>
						<h6>Temperature</h6>
					</li>
					<li>
						<span>{this.props.forecast.dewPoint} &deg;F</span>
						<h6>Dew Point</h6>
					</li>
					<li>
						<span>{this.props.forecast.humidity}%</span>
						<h6>Humidity</h6>
					</li>
					<li>
						<span>{this.props.forecast.windSpeed} mph</span>
						<h6>Wind Speed</h6>
					</li>
				</ul>
			</section>
		);
	}



};



Banner.PropTypes = {
	forecast: React.PropTypes.object.isRequired
};