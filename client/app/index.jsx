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
//	• highlight current 3 hour window in question
//		- “We predict that XX bikes will be rented from this station from [INSERT CURRENT THREE HOUR TIME INTERVAL AND DATE]"
//		- icons?
//	• build out a model that spits out different predictions for each station
// 		- make this super simple
// 	• make clear what the map is actually showing
//		- help icon overlay?
//		- "This map displays predictions for Divvy bike rentals today, [INSERT CURRENT DATE]. The average error of the model is approximately +/- 2 rentals per three-hour period.*"
//	• connect to Yelp API
//		- most popular nearby spots?
//	• show user's current location
//	• deploy early and often
//	• add a logo
//	• style panel using ideas from Dribbble
// 	• bulleted text in conclusion styling
//	• make sure experience is going to be good for users
//		- no errors (server side)
//		- make sure workers save predictions
//	• make a favicon


