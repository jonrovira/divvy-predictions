import React from 'react';

export default class CurrentTimeBlock extends React.Component {



	getCurrentTimeBlock() {
		let localOffset = -(new Date().getTimezoneOffset() / 60);
		let chicagoOffset = -5;
		let difference = chicagoOffset - localOffset;

		let hourStart = new Date(new Date().getTime() + difference * 3600 * 1000).getHours();
		let hourEnd = (hourStart + 3) % 24;

		let ampm = hourEnd >= 12 ? 'pm' : 'am';
		hourStart = hourStart % 12;
		hourStart = hourStart ? hourStart : 12;
		hourEnd = hourEnd % 12;
		hourEnd = hourEnd ? hourEnd : 12;
		let block = hourStart + ':00 - ' + hourEnd + ':00' + ampm;

		return block;
	}



	render() {
		return (
			<div className="current-time-block">
				<h4>Currently predicting demand during</h4>
				<h5>{this.getCurrentTimeBlock()}</h5>
			</div>
		);
	}



}