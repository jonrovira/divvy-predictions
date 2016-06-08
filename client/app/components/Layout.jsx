import React from 'react';
import Header from './header/Header.jsx';
import Map from './map/Map.jsx';
import Panel from './panel/Panel.jsx';

export default class Layout extends React.Component {



	render() {
		return (
			<div className="layout">
				<Header
					temperature={this.props.temperature}
					dewPoint={this.props.dewPoint}
					humidity={this.props.humidity}
					windSpeed={this.props.windSpeed} />
				<Map
					data={this.props.data}
					setActiveStationId={this.props.setActiveStationId} />
				<Panel
					data={this.props.data}
					activeStationId={this.props.activeStationId}
					setActiveStationId={this.props.setActiveStationId} />
			</div>
		);
	}



};



Layout.PropTypes = {
	data: React.PropTypes.array.isRequired,
	activeStationId: React.PropTypes.string.isRequired,
	setActiveStationId: React.PropTypes.func.isRequired,
	temperature: React.PropTypes.number.isRequired,
	dewPoint: React.PropTypes.number.isRequired,
	humidity: React.PropTypes.number.isRequired,
	windSpeed: React.PropTypes.number.isRequired
};