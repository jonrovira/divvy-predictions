import React from 'react';
import Header from './header/Header.jsx';
import Favicon from 'react-favicon';
import favicon from '../img/favicon.ico';

export default class App extends React.Component {



	render() {
		return (
			<main>
				<Favicon url={favicon} />

				<Header />

				{ this.props.children }
				
			</main>
		);
	}



};