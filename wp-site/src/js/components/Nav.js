import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom'

export default class Nav extends Component {
	render() {
		return (
			<div>
				<Link to="/">Home</Link>
				<Link to="/about">About</Link>
			</div>

		)
	}
}