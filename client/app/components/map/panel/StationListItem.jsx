import React from 'react';
import classNames from 'classnames';

export default class StationListItem extends React.Component {



	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}



	handleClick(event) {
		this.props.setActiveStationId(this.props.id);
	}



	render() {
		const itemClass = classNames({
			'station-list-item': true,
			'active': this.props.active
		});
		return (
			<li
				className={itemClass}
				onClick={this.handleClick} >
				<h3>Bike capacity: {this.props.capacity}</h3>
				<h2>{this.props.name}</h2>
			</li>
		);
	}



};



StationListItem.PropTypes = {
	id: React.PropTypes.string.isRequired,
	lat: React.PropTypes.string.isRequired,
	lng: React.PropTypes.string.isRequired,
	name: React.PropTypes.string.isRequired,
	active: React.PropTypes.bool.isRequired,
	capacity: React.PropTypes.number.isRequired,
	prediction: React.PropTypes.number.isRequired,
	setActiveStationId: React.PropTypes.func.isRequired
};