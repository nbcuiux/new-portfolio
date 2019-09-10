

import React from 'react'
import { render } from 'react-dom'

import routes from "../components/Routes";
import App from '../components/App'

import { init, getRouteData } from "wp-react";


init({ 
	wpUrl: "http://portfolio-wp.nbcuxlab.com/wordpress/",
	contextRoute: "/wpreact/context" 
});

render(
	<App />,
  document.getElementById('root')
)
