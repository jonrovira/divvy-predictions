import React from 'react';
import classNames from 'classnames';

export default class StationListItem extends React.Component {



	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}



	handleClick(event) {
		this.props.setActiveStationId(parseInt(this.props.station.id));
	}



	render() {
		let itemClass = classNames({
			'station-list-item': true,
			'active': this.props.isActive
		});

		return (
			<li
				className={itemClass}
				onClick={this.handleClick} >
				<h3>Bike capacity: {this.props.station.capacity}</h3>
				<h2>{this.props.station.name}</h2>
			</li>
		);
	}



};



StationListItem.PropTypes = {
	station: React.PropTypes.object.isRequired,
	isActive: React.PropTypes.bool.isRequired,
	setActiveStationId: React.PropTypes.func.isRequired
};