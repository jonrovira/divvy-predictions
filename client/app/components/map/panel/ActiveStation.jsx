import React from 'react';

export default class ActiveStation extends React.Component {



	constructor(props) {
		super(props);
		this.getActiveStation = this.getActiveStation.bind(this);
	}



	getActiveStation() {
		for (let i=0; i < this.props.stations.length; i++) {
			if (this.props.stations[i].id === this.props.activeStationId)
				return this.props.stations[i];
		}
		return false;
	}



	render() {
		const station = this.getActiveStation();
		return (
			<div className="active-station">
				{station
					?
						<div>
							<h3>Bike capacity: {station.capacity}</h3>
							<h2>{station.name}</h2>
							<h4>We predict that {Number(station.prediction).toFixed(3)} bikes will be rented at this station in the next 3 hours.</h4>
						</div>
					:
						''

				}
			</div>
		);
	}



};



ActiveStation.PropTypes = {
	stations: React.PropTypes.array.isRequired,
	activeStationId: React.PropTypes.string.isRequired
};