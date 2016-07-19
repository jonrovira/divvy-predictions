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
						<span>{parseFloat(this.props.forecast.temperature).toFixed(2)} &deg;F</span>
						<h6>Temperature</h6>
					</li>
					<li>
						<span>{parseFloat(this.props.forecast.dewPoint).toFixed(2)} &deg;F</span>
						<h6>Dew Point</h6>
					</li>
					<li>
						<span>{(parseFloat(this.props.forecast.humidity) * 100).toFixed(2)}%</span>
						<h6>Humidity</h6>
					</li>
					<li>
						<span>{this.props.forecast.windSpeed} MPH</span>
						<h6>Wind Speed</h6>
					</li>
					<li>
						<span>{parseFloat(this.props.forecast.pressure).toFixed(2)} MB</span>
						<h6>Pressure</h6>
					</li>
					<li>
						<span>{parseFloat(this.props.forecast.precipIntensity).toFixed(2)} IN/HR</span>
						<h6>Precipitation</h6>
					</li>
					<li>
						<span>{parseFloat(this.props.forecast.visibility).toFixed(2)} MI</span>
						<h6>Visibility</h6>
					</li>
				</ul>
			</section>
		);
	}



};



Banner.PropTypes = {
	forecast: React.PropTypes.object.isRequired
};