import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory, IndexRedirect } from 'react-router';



import App from './components/App.jsx';
import MapPage from './components/map/Page.jsx';
import ModelPage from './components/model/Page.jsx';
import TeamPage from './components/team/Page.jsx';



import './styles/normalize.scss';
import 'font-awesome/scss/font-awesome.scss';
import './styles/main.scss';



render((
	<Router history={browserHistory}>

		<Route path="/" component={App}>

			<IndexRedirect to={"/map"}/>
			<Route path="map" component={MapPage} />
			<Route path="model" component={ModelPage} />
			<Route path="team" component={TeamPage} />
			
		</Route>

	</Router>
), document.getElementById('render-target'));