import React from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';

export default class Marker extends React.Component {



	shouldComponentUpdate = shouldPureComponentUpdate;



	render() {
		return (
			<div className="station-marker">
				{this.props.text}
			</div>
		);
	}



}



Marker.PropTypes = {
	text: React.PropTypes.string.isRequired
};