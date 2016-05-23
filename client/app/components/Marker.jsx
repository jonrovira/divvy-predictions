import React from 'react';
import classNames from 'classnames';
import shouldPureComponentUpdate from 'react-pure-render/function';

export default class Marker extends React.Component {



	shouldComponentUpdate = shouldPureComponentUpdate;



	getHeat(prediction) {
		const red = [255, 0, 0];
		const green = [0, 255, 0];

		let weight = (prediction+1) / 10;
		let r = Math.floor(red[0] + weight*(green[0] - red[0]));
		let g = Math.floor(red[1] + weight*(green[1] - red[1]));
		let b = Math.floor(red[1] + weight*(green[2] - red[2]));

		return 'rgb('+r+','+g+','+b+')';
	}



	render() {
		const style = {
			backgroundColor: this.getHeat(this.props.prediction)
		};

		return (
			<div
				className="station-marker"
				style={style}>
				{this.props.text}
			</div>
		);
	}



}



Marker.PropTypes = {
	prediction: React.PropTypes.string.isRequired
};