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
				<h2>Station {station.id}</h2>
				<h4>Prediction: {station.prediction}</h4>
				<span>Latitude: {station.lat}</span>
				<span>Longitude: {station.lng}</span>
			</div>
		);
	}



};



ActiveStation.PropTypes = {
	stations: React.PropTypes.array.isRequired,
	activeStationId: React.PropTypes.string.isRequired
};