import React, { Component, PropTypes } from 'react';
import LayoutMain from "./LayoutMain"

export default class About extends Component {
	render() {
		const { wpContext, wpContent, wpStatus } = this.props;

		console.log("rendering about page, wp status:", wpStatus);
		console.log("together with its props", this.props);

		return (
			<div>
				<LayoutMain>
					{
						wpStatus === 2 ?
							(
								<div className="team-list">
									{
										wpContext.options.team.map((person, index)=> {
											return (
												<div className="team-item" key={index}>
													<div>{person.first_name} {person.last_name}</div>
													<img src={person.profile_image.url} />
												</div>
											)
										})
									}
								</div>
							)
						:
							<span>Loading...</span>
					}
				</LayoutMain>
			</div>
		)
	}
}