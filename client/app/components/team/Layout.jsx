import React from 'react';
import TeamList from './TeamList.jsx';

export default class Layout extends React.Component {



	render() {
		return (
			<div id="team" className="layout">
				<TeamList />
			</div>
		);
	}



};