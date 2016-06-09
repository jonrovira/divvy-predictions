import React from 'react';

export default class Banner extends React.Component {



	render() {
		return (
			<section className="banner">
				<h2>Current conditions:</h2>
				<ul>
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