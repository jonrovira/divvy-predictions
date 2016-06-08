import React from 'react';
import HeaderTop from './HeaderTop.jsx';
import HeaderBottom from './HeaderBottom.jsx';

export default class Header extends React.Component {



	render() {
		return (
			<section className="header">
			
				<HeaderTop
					temperature={this.props.temperature}
					dewPoint={this.props.dewPoint}
					humidity={this.props.humidity}
					windSpeed={this.props.windSpeed} />
				<HeaderBottom />

			</section>
		);
	}



};