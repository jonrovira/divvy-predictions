import React from 'react';
import { render } from 'react-dom';
import { createHistory } from 'history';
import { Router, Route, IndexRedirect, useRouterHistory } from 'react-router';



import App from './components/App.jsx';
import MapPage from './components/map/Page.jsx';
import ModelPage from './components/model/Page.jsx';
import TeamPage from './components/team/Page.jsx';



import './styles/normalize.scss';
import 'font-awesome/scss/font-awesome.scss';
require('./font/montserrat/font.scss');
import './styles/main.scss';



const browserHistory = useRouterHistory(createHistory)({
	basename: '/divvy-predictions'
})



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




// you're going to:
//
//	• build out a model that spits out different predictions for each station
// 		- make this super simple
//	• connect to Yelp API
//		- most popular nearby spots?
//	• deploy early and often
//	• make sure experience is going to be good for users
//		- no errors (server side)
//		- make sure workers save predictions
//	• make a favicon
//	• no selected active station


