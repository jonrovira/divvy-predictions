import React from 'react';

export default class TeamList extends React.Component {



	render() {
		return (
			<section className="team">
				<ul className="team-list">
					<li className="team-list-item">
						<h3>Mark Giangreco</h3>
						<a href="https://www.linkedin.com/in/markgiangreco" target="_blank">
							<i className="fa fa-linkedin-square"></i>
						</a>
						<p>
							Mark is a second-year MBA student at the Kellogg School of
							Management. Over the summer, he worked at Groupon in Business
							Operations. Prior to Kellogg, he managed marketing analytics
							teams for political campaigns in Washington, D.C.
						</p>
					</li>
					<li className="team-list-item">
						<h3>Chris Mark</h3>
						<a href="https://www.linkedin.com/in/christopher-mark-96716bb4" target="_blank">
							<i className="fa fa-linkedin-square"></i>
						</a>
						<p>
							Chris is in the class of 2017, majoring in Computer Science
							through the Weinberg College of Arts & Sciences, and minoring in
							Cognitive Science. He is currently working for Northwestern Research
							Computing, doing development for Quest -- Northwestern&#39;s
							High Performance Computing Cluster.
						</p>
					</li>
					<li className="team-list-item">
						<h3>Jon Rovira</h3>
						<a href="https://www.linkedin.com/in/jonrovira" target="_blank">
							<i className="fa fa-linkedin-square"></i>
						</a>
						<p>
							Jon is a senior studying Computer Science in the McCormick
							School of Engineering.
						</p>
					</li>
				</ul>
			</section>
		);
	}



};