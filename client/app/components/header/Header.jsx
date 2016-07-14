import React from 'react';
import Help from './Help.jsx';
import { Link } from 'react-router';
import classNames from 'classnames';
import logo from '../../img/logo.png';



export default class Header extends React.Component {



	constructor(props) {
		super(props);
		this.state = {
			showHelp: false
		};
		this.toggleHelp = this.toggleHelp.bind(this);
	}



	toggleHelp(event) {
		this.setState({ showHelp: !this.state.showHelp });
	}



	render() {
		let helpIconClass = classNames({
			'fa fa-question-circle-o': true,
			'active': this.state.showHelp
		});

		return (
			<section className="header">
				<div className="logo">
					<img src={logo} />
				</div>
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
				<div className="help">
					<i
						onClick={this.toggleHelp}
						className={helpIconClass}></i>
					{ this.state.showHelp ? <Help /> : '' }
				</div>
			</section>			
		);
	}



}