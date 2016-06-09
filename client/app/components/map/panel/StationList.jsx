import React from 'react';
import StationListItem from './StationListItem.jsx';

export default class StationList extends React.Component {



	render() {
		return (
			<ul className="station-list">
				{this.props.stations.map((station, i) => {
					return (
						<StationListItem
							key={i}
							id={station.id}
							lat={station.lat}
							lng={station.lng}
							name={station.name}
							capacity={station.capacity}
							prediction={station.prediction}
							active={this.props.activeStationId == station.id}
							setActiveStationId={this.props.setActiveStationId} />
					)
				})}
			</ul>
		);
	}



};



StationList.PropTypes = {
	stations: React.PropTypes.array.isRequired,
	setActiveStationId: React.PropTypes.func.isRequired,
	activeStationId: React.PropTypes.string.isRequired
};