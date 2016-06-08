import React from 'react';
import Header from './header/Header.jsx';

export default class App extends React.Component {



	render() {
		return (
			<main>

				<Header />

				{ this.props.children }
				
			</main>
		);
	}



};