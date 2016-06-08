import React from 'react';
import StationList from './StationList.jsx';
import ActiveStation from './ActiveStation.jsx';

export default class Panel extends React.Component {



	render() {
		return (
			<section className="panel">
				<ActiveStation
					stations={this.props.data}
					activeStationId={this.props.activeStationId} />
				<StationList
					stations={this.props.data}
					setActiveStationId={this.props.setActiveStationId} />
			</section>
		);
	}



};



Panel.PropTypes = {
	data: React.PropTypes.array.isRequired,
	activeStationId: React.PropTypes.string.isRequired,
	setActiveStationId: React.PropTypes.func.isRequired
};