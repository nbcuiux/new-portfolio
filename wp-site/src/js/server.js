var express = require('express')
var app = express()

import { init, getRouteData } from "wp-react";
import { routes } from "./components/Routes"
import RootStatic from "./components/RootStatic"

import React from 'react'
import ReactDOMServer from 'react-dom/server'

init({ 
	wpUrl: "http://portfolio-wp.nbcuxlab.com/wordpress/",
	contextRoute: "/wpreact/context"
});

app.use('/assets', express.static('build/assets'));

app.get('*', function (req, res) {


	getRouteData(routes, req.url).then((val) => {
		const str = ReactDOMServer.renderToStaticMarkup(
			<RootStatic location={req.url} />
		)
		res.send(str);
	}).catch((e) => {
		res.send("WpReact - Error contacting wordpress: " + e.message);
	})


})

app.listen(8000, function () {
  console.log('Example app listening on port 8000!')
})