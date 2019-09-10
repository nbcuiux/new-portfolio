import React, { Component, PropTypes } from 'react';
import classNames from "classnames";

export default class Greeting extends Component {
	render() {

		const props = this.props;
		const classnames = classNames({
			[props.className]: props.className != undefined,
			'section-container' : true,
			'greeting-container' : true
		})
		return (
			<section className={classnames} ref={props.ref} key={props.key}>
				<div className="slogan-container">{ props.slogan }</div>
			</section>
		)
	}
}
