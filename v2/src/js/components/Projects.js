import React, { Component, PropTypes } from 'react';
import classNames from "classnames";

export function Projects (props) {
	const classnames = classNames({
		[props.className]: props.className != undefined,
		'section-container' : true,
		'section-container--inited' : props.inited,
		'section-container--active' : props.active,
		'projects-container': true
	})
	return (
		<section className={classnames} ref={props.ref} key={props.key}>
			<div className="title-container">{ props.title }</div>
			<div className="projects-list">
				<div className="projects-head">
					<div className="projects-head__legend"><span className="expendable-mark "></span>Year</div>
					<div className="projects-head__legend"><span className="expendable-mark "></span>Title</div>
					<div className="projects-head__legend"><span className="expendable-mark "></span>Client</div>
					<div className="projects-head__legend auto-width"><span className="expendable-mark "></span>Responsibilities</div>
				</div>
				{
					props.projects.map((project, index) => {
						return (
							<div key={index}  className="project">
								<div className="project__column">{ project.year }</div>
								<div className="project__column">{ project.title }</div>
								<div className="project__column">{ project.client }</div>
								<div className="project__column auto-width project__column-resp">{ project.resp }</div>
							</div>
						)
					})
				}
			</div>
		</section>
	)
}