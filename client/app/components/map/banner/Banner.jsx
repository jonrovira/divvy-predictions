import React from 'react';

export default class Banner extends React.Component {



	render() {
		return (
			<section className="banner">
				<ul>
					<li>
						<span>{this.props.temperature}</span>
						<h6>Temperature</h6>
					</li>
					<li>
						<span>{this.props.dewPoint}</span>
						<h6>Dew Point</h6>
					</li>
					<li>
						<span>{this.props.humidity}</span>
						<h6>Humidity</h6>
					</li>
					<li>
						<span>{this.props.windSpeed}</span>
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