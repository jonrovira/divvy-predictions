import React from 'react';
import StationList from './StationList.jsx';
import ActiveStation from './ActiveStation.jsx';

export default class Panel extends React.Component {



	render() {
		return (
			<section className="panel">
				<ActiveStation
					predictions={this.props.predictions}
					activeStationId={this.props.activeStationId} />
				<StationList
					predictions={this.props.predictions}
					activeStationId={this.props.activeStationId}
					setActiveStationId={this.props.setActiveStationId} />
			</section>
		);
	}



};



Panel.PropTypes = {
	predictions: React.PropTypes.array.isRequired,
	activeStationId: React.PropTypes.number.isRequired,
	setActiveStationId: React.PropTypes.func.isRequired
};