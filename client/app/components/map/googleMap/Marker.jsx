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
		this.props.setActiveStationId(this.props.id);
	}



	render() {
		const size = this.getSize(this.props.prediction);
		const style = {
			width: size,
			height: size
		};

		return (
			<div
				onClick={this.handleClick}
				className="station-marker"
				style={style}>
				{this.props.text}
			</div>
		);
	}



}



Marker.PropTypes = {
	id: React.PropTypes.string.isRequired,
	prediction: React.PropTypes.string.isRequired,
	setActiveStationId: React.PropTypes.func.isRequired
};