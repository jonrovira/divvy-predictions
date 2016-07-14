import React from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import GoogleMap from 'google-map-react';
import Marker from './Marker.jsx';

export default class Map extends React.Component {



	static defaultProps = {
		center: {lat: 41.8781, lng: -87.6298},
	    zoom: 11
	}



	constructor(props) {
		super(props);
		this.state = {
			userLat: null,
			userLng: null
		};
		this.getMarkers = this.getMarkers.bind(this);
	}



	shouldComponentUpdate = shouldPureComponentUpdate;



	componentWillMount() {
		let options = {
			enableHighAccuracy: true,
			timeout: 5000,
			maximumAge: 0
		};

		let _ = this;
		function success(pos) {
			let crd = pos.coords;
			_.setState({
				userLat: crd.latitude,
				userLng: crd.longitude
			});
		};

		function error(err) {
			console.warn('ERROR(' + err.code + '): ' + err.message);
		};

		navigator.geolocation.getCurrentPosition(success, error, options);
	}



	createMapOptions() {
		return {
			styles: [{"featureType":"water","elementType":"all","stylers":[{"color":"#2696C3"}]},{"featureType":"road","elementType":"all","stylers":[{"color":"#75CBE5"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#6CC8E6"}]},{"featureType":"administrative","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]}]
		};
	}



	getMarkers() {
		let markers = this.props.predictions.map((p, i) => {
			return (
				<Marker
					key={i}
					lat={parseFloat(p.lat)}
					lng={parseFloat(p.lng)}
					prediction={p}
					isActive={parseInt(p.id) == this.props.activeStationId}
					isStation={true}
					setActiveStationId={this.props.setActiveStationId} />
			);
		});

		if (this.state.userLat) {
			markers.push(
				<Marker
					key={100000}
					lat={this.state.userLat}
					lng={this.state.userLng}
					prediction={null}
					isActive={false}
					isStation={false}
					setActiveStationId={function () {return;}} />
			);
		}

		return markers;
	}



	render() {
		return (
			<section className="map">
				<GoogleMap
					defaultCenter={this.props.center}
	        		defaultZoom={this.props.zoom}
	        		options={this.createMapOptions}>

	        		{this.getMarkers()}

				</GoogleMap>
			</section>
		);
	}



}



Map.PropTypes = {
	predictions: React.PropTypes.array.isRequired,
	activeStationId: React.PropTypes.number.isRequired,
	setActiveStationId: React.PropTypes.func.isRequried
};