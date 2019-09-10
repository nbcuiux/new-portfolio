import React from 'react';
import {Route, IndexRoute, Switch} from "react-router";
import ReactDOMServer from 'react-dom/server'
import Home from "./Home"
import About from "./About"

import { makeWpRoute } from 'wp-react';

export const routes = (
		<div>
			<Switch>
	  		<Route exact path="/" component={ makeWpRoute(Home, "pages", {"slug":"home-page"}) } />
	  		<Route path="/about" component={ makeWpRoute(About, "pages", {"slug":"about"}) } />
	  		<Route path="/:slug" component={ makeWpRoute(Home, "pages", {"slug":"home-page"}) } />
	  	</Switch>
	  </div>
);
