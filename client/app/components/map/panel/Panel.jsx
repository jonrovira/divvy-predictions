import React from 'react';
import CurrentTimeBlock from './CurrentTimeBlock.jsx';
import ActiveStation from './ActiveStation.jsx';
import StationList from './StationList.jsx';

export default class Panel extends React.Component {



	render() {
		return (
			<section className="panel">
				<CurrentTimeBlock />
				<ActiveStation
					predictions={this.props.predictions}
					activeStationId={this.props.activeStationId} />
				<StationList
					predictions={this.props.predictions}
					activeStationId={this.props.activeStationId}
					setActiveStationId={this.props.setActiveStationId}
					bounds={this.props.bounds} />
			</section>
		);
	}



};



Panel.PropTypes = {
	predictions: React.PropTypes.array.isRequired,
	activeStationId: React.PropTypes.number.isRequired,
	setActiveStationId: React.PropTypes.func.isRequired,
	bounds: React.PropTypes.object.isRequired,
};