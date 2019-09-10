import React, { Component, PropTypes } from 'react';
import { Router, browserHistory } from "react-router";
import { routes } from "./Routes"
import { BrowserRouter } from 'react-router-dom'


export default class App extends Component {

	render() {
		return (
			<BrowserRouter>
				{routes}
			</BrowserRouter>
		)
	}

}