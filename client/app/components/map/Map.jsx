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



	render() {
		return (
			<section className="map">
				<GoogleMap
					defaultCenter={this.props.center}
	        		defaultZoom={this.props.zoom}>

	        		{this.props.data.map( (d, i) => {
	        			return (
	        				<Marker
	        					key={i}
	        					lat={parseFloat(d.lat)}
	        					lng={parseFloat(d.lng)}
	        					id={d.id}
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
	setActiveStationId: React.PropTypes.func.isRequried
};