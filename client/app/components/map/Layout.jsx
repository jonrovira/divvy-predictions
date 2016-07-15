import React from 'react';
import Banner from './banner/Banner.jsx';
import Map from './googleMap/Map.jsx';
import Panel from './panel/Panel.jsx';

export default class Layout extends React.Component {



	render() {
		return (
			<div className="layout">
				<Banner
					forecast={this.props.forecast} />
				<Map
					predictions={this.props.predictions}
					activeStationId={this.props.activeStationId}
					setActiveStationId={this.props.setActiveStationId}
					bounds={this.props.bounds}
					onChange={this.props.onChange}/>
				<Panel
					predictions={this.props.predictions}
					activeStationId={this.props.activeStationId}
					setActiveStationId={this.props.setActiveStationId}
					bounds={this.props.bounds}/>
			</div>
		);
	}



};



Layout.PropTypes = {
	predictions: React.PropTypes.array.isRequired,
	forecast: React.PropTypes.object.isRequired,
	activeStationId: React.PropTypes.number.isRequired,
	setActiveStationId: React.PropTypes.func.isRequired,
	bounds: React.PropTypes.object.isRequired,
	onChange: React.PropTypes.func.isRequired
};