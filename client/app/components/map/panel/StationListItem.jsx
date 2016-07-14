import React from 'react';
import classNames from 'classnames';

export default class StationListItem extends React.Component {



	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
		this.getFraction = this.getFraction.bind(this);
		this.getFillWidth = this.getFillWidth.bind(this);
	}



	handleClick(event) {
		this.props.setActiveStationId(parseInt(this.props.station.id));
	}



	getFraction() {
		let capacity = this.props.station.capacity;
		let demand = this.props.station.prediction;
		let left = Math.floor(capacity - demand);
		left = left > 0 ? left : 0;
		return left + ' / ' + capacity;
	}



	getFillWidth() {
		let capacity = this.props.station.capacity;
		let demand = this.props.station.prediction;
		let left = capacity - demand;
		left = left > 0 ? left : 0;
		return 100 * (left / capacity);
	}



	render() {
		let itemClass = classNames({
			'station-list-item': true,
			'active': this.props.isActive
		});
		let fillStyle = { width: this.getFillWidth() + '%' };

		return (
			<li
				className={itemClass}
				onClick={this.handleClick} >
				<h4>{this.props.station.name}</h4>
				<span className="fraction"><i className="fa fa-bicycle"></i>{this.getFraction()}</span>
				<div className="fill-bar">
					<div className="fill" style={fillStyle}></div>
				</div>
			</li>
		);
	}



};



StationListItem.PropTypes = {
	station: React.PropTypes.object.isRequired,
	isActive: React.PropTypes.bool.isRequired,
	setActiveStationId: React.PropTypes.func.isRequired
};