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



	getFillWidth(station) {
		let capacity = station.capacity;
		let demand = station.prediction;
		let left = capacity - demand;
		left = left > 0 ? left : 0;
		return 100 * (left / capacity);
	}



	getFraction(station) {
		let capacity = station.capacity;
		let demand = station.prediction;
		let left = Math.floor(capacity - demand);
		left = left > 0 ? left : 0;
		return left + ' / ' + capacity;
	}



	render() {
		let activeStation = this.getActiveStation();
		let fillStyle = { width: this.getFillWidth(activeStation) + '%' };
		
		return (
			<div className="active-station">
				{activeStation ?
						<div>
							<h2>{activeStation.name}</h2>
							<span className="fraction"><i className="fa fa-bicycle"></i>{this.getFraction(activeStation)}</span>
							<div className="fill-bar">
								<div className="fill" style={fillStyle}></div>
							</div>
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