import React from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import GoogleMap from 'google-map-react';
import Marker from './Marker.jsx';

export default class Map extends React.Component {



	constructor(props) {
		super(props);
	}



	static defaultProps = {
		center: {lat: 41.8781, lng: -87.6298},
	    zoom: 11,
	}



	shouldComponentUpdate = shouldPureComponentUpdate;



	createMapOptions() {
		return {
			styles: [{"featureType":"landscape","stylers":[{"hue":"#FFBB00"},{"saturation":43.400000000000006},{"lightness":37.599999999999994},{"gamma":1}]},{"featureType":"road.highway","stylers":[{"hue":"#FFC200"},{"saturation":-61.8},{"lightness":45.599999999999994},{"gamma":1}]},{"featureType":"road.arterial","stylers":[{"hue":"#FF0300"},{"saturation":-100},{"lightness":51.19999999999999},{"gamma":1}]},{"featureType":"road.local","stylers":[{"hue":"#FF0300"},{"saturation":-100},{"lightness":52},{"gamma":1}]},{"featureType":"water","stylers":[{"hue":"#0078FF"},{"saturation":-13.200000000000003},{"lightness":2.4000000000000057},{"gamma":1}]},{"featureType":"poi","stylers":[{"hue":"#00FF6A"},{"saturation":-1.0989010989011234},{"lightness":11.200000000000017},{"gamma":1}]}]
		};
	}



	render() {
		return (
			<section className="map">
				<GoogleMap
					defaultCenter={this.props.center}
	        		defaultZoom={this.props.zoom}
	        		options={this.createMapOptions}>

	        		{this.props.data.map( (d, i) => {
	        			return (
	        				<Marker
	        					key={i}
	        					lat={parseFloat(d.lat)}
	        					lng={parseFloat(d.lng)}
	        					active={d.id == this.props.activeStationId}
	        					id={d.id}
	        					name={d.name}
	        					capacity={d.capacity}
	        					prediction={d.prediction}
	        					setActiveStationId={this.props.setActiveStationId} />
	        			);
	        		})}

				</GoogleMap>
			</section>
		);
	}



}



Map.PropTypes = {
	data: React.PropTypes.array.isRequired,
	activeStationId: React.PropTypes.string.isRequired,
	setActiveStationId: React.PropTypes.func.isRequried
};