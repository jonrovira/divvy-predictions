import React from 'react';

export default class ActiveStation extends React.Component {



	constructor(props) {
		super(props);
		this.getActiveStation = this.getActiveStation.bind(this);
	}



	getActiveStation() {
		for (let i=0; i < this.props.predictions.length; i++) {
			if (parseInt(this.props.predictions[i].id) === this.props.activeStationId)
				return this.props.predictions[i];
		}
		return false;
	}



	render() {
		let activeStation = this.getActiveStation();
		
		return (
			<div className="active-station">
				{activeStation ?
						<div>
							<h3>Bike capacity: {activeStation.capacity}</h3>
							<h2>{activeStation.name}</h2>
							<h4>We predict that {Number(activeStation.prediction).toFixed(3)} bikes will be rented at this station in the next 3 hours.</h4>
						</div>
					:
						''

				}
			</div>
		);
	}



};



ActiveStation.PropTypes = {
	predictions: React.PropTypes.array.isRequired,
	activeStationId: React.PropTypes.number.isRequired
};