import React from 'react';
import { Link } from 'react-router';

export default class Header extends React.Component {



	render() {
		return (
			<section className="header">
				<nav>
					<ul>
						<li>
							<Link to="/map">Map</Link>
						</li>
						<li>
							<Link to="/model">Model</Link>
						</li>
						<li>
							<Link to="/team">Team</Link>
						</li>
					</ul>
				</nav>
			</section>
		);
	}



};