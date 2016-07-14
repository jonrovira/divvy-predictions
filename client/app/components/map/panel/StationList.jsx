import React from 'react';
import StationListItem from './StationListItem.jsx';

export default class StationList extends React.Component {



	render() {
		return (
			<ul className="station-list">
				{this.props.predictions.map((prediction, i) => {
					return (
						<StationListItem
							key={i}
							station={prediction}
							isActive={parseInt(prediction.id) === this.props.activeStationId}
							setActiveStationId={this.props.setActiveStationId} />
					)
				})}
			</ul>
		);
	}



};



StationList.PropTypes = {
	predictions: React.PropTypes.array.isRequired,
	activeStationId: React.PropTypes.number.isRequired,
	setActiveStationId: React.PropTypes.func.isRequired
};