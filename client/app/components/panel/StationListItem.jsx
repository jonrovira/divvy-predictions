import React from 'react';

export default class StationListItem extends React.Component {



	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}



	handleClick(event) {
		this.props.setActiveStationId(this.props.id);
	}



	render() {
		return (
			<li
				className="station-list-item"
				onClick={this.handleClick} >
				<span>{this.props.id}</span>
				<span>{this.props.prediction}</span>
				<span>{this.props.lat}</span>
				<span>{this.props.lng}</span>
			</li>
		);
	}



};



StationListItem.PropTypes = {
	id: React.PropTypes.string.isRequired,
	lat: React.PropTypes.string.isRequired,
	lng: React.PropTypes.string.isRequired,
	prediction: React.PropTypes.number.isRequired,
	setActiveStationId: React.PropTypes.func.isRequired
};