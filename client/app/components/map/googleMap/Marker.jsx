import React from 'react';
import classNames from 'classnames';
import shouldPureComponentUpdate from 'react-pure-render/function';

export default class Marker extends React.Component {



	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}



	shouldComponentUpdate = shouldPureComponentUpdate;



	getSize(prediction) {
		let weight = (prediction+1) / 10;
		let maxSize = 14;
		return weight * maxSize;
	}



	handleClick(event) {
		this.props.setActiveStationId(parseInt(this.props.prediction.id));
	}



	render() {
		if (this.props.isStation) {
			let size = this.getSize(this.props.prediction.prediction);
			let style = { width: size, height: size };
			let markerClass = classNames({
				'station-marker': true,
				'active': this.props.isActive
			});

			return (
				<div
					onClick={this.handleClick}
					className={markerClass}
					style={style}>
					{this.props.text}
				</div>
			);
		}

		else {
			return (
				<div className='user-marker'>{this.props.text}</div>
			);
		}
	}



}



Marker.PropTypes = {
	prediction: React.PropTypes.object.isRequired,
	isActive: React.PropTypes.bool.isRequired,
	isStation: React.PropTypes.bool.isRequired,
	setActiveStationId: React.PropTypes.func.isRequired
};