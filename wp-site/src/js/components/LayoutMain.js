import React, { Component, PropTypes } from 'react';
import Nav from "./Nav"

export default class LayoutMain extends Component {
	render() {
		return (
			<div>
				<Nav />
				{ this.props.children }
			</div>
		)
	}
}