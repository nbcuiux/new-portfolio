import React, { Component, PropTypes } from 'react';
import { StaticRouter } from 'react-router'
import { routes } from "./Routes"

export default class RootStatic extends Component {

	render() {
		return (
		<html>
        	<head>
				<link href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900" rel="stylesheet" type="text/css" />
				<link rel="stylesheet" href="assets/css/styles.css" />
				<link rel="icon" type="image/png" href="assets/favicon.png" />
				<title>{this.props.title}</title>
			</head>
        	<body>
        		<div id="root">
					<StaticRouter location={this.props.location} context={{}}>
						<div>{ routes }</div>
					</StaticRouter>
				</div>
				<script src="assets/js/app.js"></script>
			</body>
		</html>
		)
	}
}