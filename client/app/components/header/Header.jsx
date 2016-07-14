import React from 'react';
import { Link } from 'react-router';



const Header = () => (
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



export default Header;