import React, { Component, PropTypes } from 'react';
import classNames from "classnames";

import { Timer, isServer } from "../client/utils";
import $ from "jquery";

export default class CounterSection extends Component {
	dom = {
		container : null,

		projectsCount : null,
		employeesCount : null
	}

	timer = null
	animation = {
		timer : null,
		start : 0,
		end : 0,
		cur : 0
	}

	constructor(props) {
		super(props);

		this.state = {
			initialized : false,
			countdownEnded : false,
		}

		

		let frames = 10;
		this.timer = new Timer(1000/frames, frames * 2);
		this.timer.onTimerEvent = this.onTimerEvent;
	}

	onFocus = (e) => {

		if (this.state.countdownEnded) return 0;
		this.timer.reset();
		this.animation.start = this.animation.cur;
		this.animation.end = 1.0;
		this.timer.start();
	}
	onBlur = (e) => {

		if (this.state.countdownEnded) return 0;
		this.timer.reset();
		this.animation.start = this.animation.cur;
		this.animation.end = 0.0;
		this.timer.start();
	}

	onTimerEvent = (e) => {
		let A = e.currentCount/e.repeatCount;
		let B = (Math.sin((A - 0.5) * Math.PI) + 1) * 0.5;
		this.animation.cur = B * this.animation.end + (1 - B) * this.animation.start;
		let C = this.animation.cur;

		let projects = this.props.projectsCount;
		let employees = this.props.emloyeesCount;


		this.dom.projectsCount.html(Math.round(C * projects));
		this.dom.employeesCount.html(Math.round( 0.3 * employees + 0.7 * C * employees ));

		if (C == 1.0) {
			this.setState( { countdownEnded : true} );
		}

	}

	componentDidMount() {
		// init properties
		this.dom.projectsCount = $(this.dom.container).find(".projects .counter__number");
		this.dom.employeesCount = $(this.dom.container).find(".employees .counter__number");
	}

	componentWillReceiveProps(newProps) {
		if (!this.props.active && newProps.active) {
			//onFocus
			this.onFocus();
		}
		if (this.props.active && !newProps.active) {
			//onBlur
			this.onBlur();
		}
	}

	render() {

		const props = this.props;

		const classnames = classNames({
			[props.className]: props.className != undefined,
			'section-container' : true,
			'counter-container': true
		})

		return (
			<section 
				className={classnames} 
				ref={ (el) => {this.dom.container = el} }
				key={props.key}>
				<div className="counter__projects-container">
					<div className="wrapper counters">
						<div className="wrapper projects">
							<div className="counter__mark-cont small-text"><span className="expendable-mark "></span>Projects</div>
							<div className="counter__number">0</div>
						</div>
						<div className="wrapper employees">
							<div className="counter__mark-cont small-text"><span className="expendable-mark "></span>Team</div>
							<div className="counter__number">0</div>
						</div>
					</div>
				</div>
			</section>
		)

	}

}
