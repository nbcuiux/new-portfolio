import React, { Component, PropTypes } from 'react';
import classNames from "classnames";


export default class Feedback extends Component {
	render() {

		const props = this.props;

		const classnames = classNames({
			[props.className]: props.className != undefined,
			'section-container' : true,
			'feedback-container' : true
		})
		return (
			<section className={classnames} ref={props.ref} key={props.key}>
				<div className="wrapper">
					<div className="slogan-container">{ props.title }</div>
					<div className="feedback-form-container">{ props.placeholder }</div>
				</div>
			</section>
		)
	}
}
