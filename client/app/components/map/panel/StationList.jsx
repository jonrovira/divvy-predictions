import React from 'react';
import StationListItem from './StationListItem.jsx';

export default class StationList extends React.Component {



	constructor(props) {
		super(props);
		this._getStations = this._getStations.bind(this);
	}



	_getStations = () => {
		let stations = this.props.predictions.filter((p) => {
			let lat = parseFloat(p.lat);
			let lng = parseFloat(p.lng);
			if (lat < this.props.bounds.nw.lat && lat > this.props.bounds.se.lat && lng < this.props.bounds.se.lng && lng > this.props.bounds.nw.lng) {
				return true;
			}
			return false;
		}).map((p, i) => {
			return (
				<StationListItem
					key={i}
					station={p}
					isActive={parseInt(p.id) === this.props.activeStationId}
					setActiveStationId={this.props.setActiveStationId} />
			)
		});

		return stations;
	}



	render() {
		return (
			<ul className="station-list">
				{this._getStations()}
			</ul>
		);
	}



};



StationList.PropTypes = {
	predictions: React.PropTypes.array.isRequired,
	activeStationId: React.PropTypes.number.isRequired,
	setActiveStationId: React.PropTypes.func.isRequired,
	bounds: React.PropTypes.object.isRequired
};