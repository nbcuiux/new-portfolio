import React, { Component, PropTypes } from 'react';
import classNames from "classnames";

export function CounterBlockView (props) {
	const classnames = classNames({
		[props.className]: props.className != undefined,
		'section-container' : true,
		'section-container--inited' : props.inited,
		'section-container--active' : props.active,
		'counter-block-container' : true
	})
	return (
		<section className={classnames} ref={props.ref} key={props.key}>
			<div className="wrapper">
				<div className="city-container small-text"><span className="mark"></span>{ props.city }</div>
				<div className="address-container">{ props.address }</div>
			</div>
			<div className="nextpage-link">
				<div className="nextpage-link__pop">
				{ props.nextLink }
				</div>
			</div>
		</section>
	)
}

export default class CounterBlock extends Component {
	constructor(props) {
		super(props);
		this.state = {
			inited : false,
			active : false,

			counterBlock : {
				projects : 0,
				people : 0
			}
		}
	}
	
	render() {
		return CounterBlockView(this.state);
	}
}