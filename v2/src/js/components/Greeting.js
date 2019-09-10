import React, { Component, PropTypes } from 'react';
import classNames from "classnames";

export function Greeting (props) {
	const classnames = classNames({
		[props.className]: props.className != undefined,
		'section-container' : true,
		'section-container--inited' : props.inited,
		'section-container--active' : props.active,
		'greeting-container' : true
	})
	return (
		<section className={classnames} ref={props.ref} key={props.key}>
			<div className="slogan-container">{ props.slogan }</div>
		</section>
	)
}
