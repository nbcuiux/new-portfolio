import React, { Component, PropTypes } from 'react';
import classNames from "classnames";

export function Work (props) {
	const classnames = classNames({
		[props.className]: props.className != undefined,
		'section-container' : true,
		'section-container--inited' : props.inited,
		'section-container--active' : props.active,
		'work-container': true
	})
	return (
		<section 
			className={classnames} 
			ref={props.ref} 
			key={props.key}>
			<div className="work-symbol-container">
				<canvas className="work-symbol"></canvas>
			</div>
			<div className="work-info-container">
				<div className="wrapper">
					<div className="work-categories-container">
						{
							props.categories.map((category, index) => {
								return <div key={index} className="work-category">{ category }</div>;
							})
						}
					</div>
					<div className="work-title">{ props.title }</div>
					<div className="work-description">{ props.description }</div>
					<div className="work-link-container">
						<a href="{ props.url }" className="work-link">{ props.urlName }</a>
					</div>
				</div>
			</div>
			<div className="work-image-container">
			</div>
		</section>
	)
}