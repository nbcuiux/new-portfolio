import React, { Component, PropTypes } from 'react';
import classNames from "classnames";
//import Slider from "react-slick";


export default class SectionWrapper extends Component {

	el = null

	static propsTypes = {
		active: PropTypes.bool,
		registerSection: PropTypes.func
	}


	constructor(props) {
		super(props);

		this.state = {
			initialized : false || props.active
		}

	}

	componentDidMount() {

	}

	componentWillReceiveProps(nextProps) {
		if (!this.state.initialized && nextProps.active) {
			console.log("componentWillReceiveProps");
			this.setState({
				initialized : true
			})
		}
	}

	render() {

		const {active, section} = this.props;

		const classnames = classNames({
			[this.props.className]: this.props.className != undefined,
			'section-container' : true,
			'section-container--initialized' : this.state.initialized,
			'section-container--active' : active
		})

		let Module = section.module;

		return (
			<div className={classnames}
				ref={(el) => { this.props.registerSection(this.props.index, el); }}>
				<Module {...section.props} active={active} initialized={this.state.initialized} />
			</div>
		)
	}
}
