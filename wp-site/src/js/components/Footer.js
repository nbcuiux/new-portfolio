import React, { Component, PropTypes } from 'react';
import classNames from "classnames";

export default class Footer extends Component {
	render() {

		const props = this.props;
		const classnames = classNames({
			[props.className]: props.className != undefined,
			'section-container' : true,
			'footer-container' : true
		})
		return (
			<section className={classnames} ref={props.ref} key={props.key}>
				<div className="wrapper">
					<div className="city-container small-text"><span className="mark"></span>{ props.city }</div>
					<div className="address-container">{ props.address }</div>
				</div>
				<div className="nextpage-link">
					<div className="nextpage-link__pop">
						<div className="nextpage-link__link">{ props.nextLink }</div>
						<div className="nextpage-link__line"></div>
					</div>
				</div>
			</section>
		)
	}
}