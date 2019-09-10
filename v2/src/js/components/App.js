import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom'
import classNames from "classnames";
import { collision, inFocus, Timer } from "../client/utils";

import { Greeting } from "./Greeting";
import { Work } from "./Work";
import { Projects } from "./Projects";
import { Feedback } from "./Feedback";
import { Footer } from "./Footer";
import { MenuList } from "./MenuList";

import CounterBlock from "./CounterBlock";



const bpXlarge = 1800;
const bpLarge = 1400;
const bpDesktop = 1100;
const bpMedium = 800;
const bpSmall = 600;
const bpXsmall = 480; // for isMobile


export default class App extends Component {
	makeSectionRef = (index, e) => { this.sections[index].ref = e; }
	sections = [
		{
			module : CounterBlock,
			ref : null,
			menuTitle : "Count",
			props : {
				inited : false,
				active : false,
				ref : null,
				className : "counter"
			}
		}
	]
	currentSection = 0;

	constructor(props) {
		super(props);
		var newState = {};
		newState["sections"] = [];
		newState["currentSection"] = 0;
		newState.window = {
			height : 0,
			width : 0
		}

		//set correct ref functions
		for (let i = 0; i < this.sections.length; i++) {
			this.sections[i].props.ref = (e) => { this.makeSectionRef(i, e) };
		}
		for (var i in this.sections) {
			newState["sections"].push(this.sections[i].module(
				Object.assign(
					{ 
						key : i
					}, 
					this.sections[i].props) 
				)
			);
		}
		
		this.state = newState;

		document.addEventListener('scroll', this.onScroll);
		window.addEventListener('resize', this.onWindowResize);

		
	}

	updateModules = () => {
		console.log("App.updateModules");
		var newState = Object.assign({}, this.state);
		for (var i in this.sections) {
			newState["sections"][i] = this.sections[i].module(
				Object.assign(
					{ 
						key : i
					}, 
				this.sections[i].props));
		}
		this.setState(newState);
	}

	onScroll = (e) => {
		var needToUpdate = false;
		for (let i = 0; i < this.sections.length; i++) {
			let section = this.sections[i];
			let element = ReactDOM.findDOMNode(this.sections[i].ref);
			let collided = inFocus(element);
			if (collided) {
				if (!this.sections[i].props.inited) {
					this.sections[i].props.inited = true;
					needToUpdate = true;
				}
				if (!this.sections[i].props.active) {
					this.sections[i].props.active = true;

					//onBlur
					if (this.sections[this.currentSection].onBlur != undefined) this.sections[this.currentSection].onBlur();

					//onFocus
					this.currentSection = i;
					if (this.sections[this.currentSection].onFocus != undefined) this.sections[this.currentSection].onFocus();
					
					needToUpdate = true;
				}
				
			} else {
				if (this.sections[i].props.active) {
					this.sections[i].props.active = false;
				}
			}
		}

		if (needToUpdate) {
			this.updateModules();
			var section = this.sections[this.currentSection];
			if (section.onFocus) section.onFocus();
		}

		var container = $(".app-container");
		var scrollTop = $(window).scrollTop();

		if (scrollTop > 50) {
			container.addClass("hide-logo");
		} else {
			container.removeClass("hide-logo");
		}
	}

	// + resize
	initSymbols = (_work) => {
		for (let i = 0; i < this.sections.length; i++) {
			let section = this.sections[i];
			if (section.module == Work) {				
				let element = $(ReactDOM.findDOMNode(this.sections[i].ref));
				let canvas = $(element).find(".work-symbol");
				let w = canvas.width();
				let h = canvas.height();
				let renderer = PIXI.autoDetectRenderer(w, h, { 
					view: canvas[0],
					transparent : true,
					antialias : true,
					clearBeforeRender: false, 
					preserveDrawingBuffer: true,
					resolution : 2
				});
				let stage = new PIXI.Container();

				section.renderer = renderer;
				section.stage = stage;


				let texture = PIXI.Texture.fromImage(section.props.bk);
				let logo = new PIXI.Sprite(texture);
				logo.anchor.set(0.5);

				logo.x = w /2;
				logo.y = h / 2;

				let graphics = new PIXI.Graphics();
				graphics.beginFill(0xFFFFFF);
				graphics.drawRect(0, 0, w, h);
				stage.addChild(graphics);
				stage.addChild(logo);

				let frames = 10;
				let timer = new Timer(1000/frames/2, frames);
				section.animation.timer = timer;
				let delayId = 0;
				section.onFocus = (e) => {
					timer.reset();
					section.animation.start = section.animation.cur;
					section.animation.end = 1.0;

					if (delayId != 0) clearTimeout(delayId);
					delayId = setTimeout(function() { 
						timer.start();
					}, 1000);
				}
				section.onBlur = (e) => {
					if (delayId != 0) {
						clearTimeout(delayId);
						delayId = 0;
					} 
					timer.reset();
					section.animation.start = section.animation.cur;
					section.animation.end = 0.0;
					timer.start();
				}

				timer.onTimerEvent = (e) => {
					let A = e.currentCount/e.repeatCount;
					let B = (Math.sin((A - 0.5) * Math.PI) + 1) * 0.5;
					section.animation.cur = B * section.animation.end + (1 - B) * section.animation.start;
					let C = section.animation.cur;

					graphics.alpha = 0.2 + 0.8 * C;

					logo.scale.x = 1 + 0.2 * (1 - C);
					logo.scale.y = 1 + 0.2 * (1 - C);
					renderer.render(stage);

					if (C == 0.0) {
						canvas.css({ visibility : 'hidden' });
					} else {
						canvas.css({ visibility : 'visible' });
					}
				}
			}
		}
	}



	componentDidMount() {
		this.initSymbols();
	}

	componentWillUnmount() {
	}

	onWindowResize = (e) => {
		var w = window,
		d = document,
		documentElement = d.documentElement,
		body = d.getElementsByTagName('body')[0],
		width = w.innerWidth || documentElement.clientWidth || body.clientWidth,
		height = w.innerHeight|| documentElement.clientHeight|| body.clientHeight;


		for (let i = 0; i < this.sections.length; i++) {
			let section = this.sections[i];
			if (section.module == Work) {	
				
				let canvas = $(ReactDOM.findDOMNode(this.sections[i].ref)).find(".work-symbol");
				let element = $(ReactDOM.findDOMNode(this.sections[i].ref)).find(".work-symbol-container");
				
				let w = element.width();
				let h = element.height();

				console.log("w x h", w, h);

				canvas.attr("width", w);
				canvas.attr("height", h);

				section.renderer.view.style.width = w;
				section.renderer.view.style.height = h;
				section.renderer.resize(w, h);
				section.renderer.render(section.stage);
			}

		}	
	}

	showMenuList = (e) => {
		var container = $(".app-container");
		container.addClass("show-menu");
	}

	hideMenuList = (e) => {
		var container = $(".app-container");
		container.removeClass("show-menu");
	}



	render() {
		const classnames = classNames({
			'app-container' : true,
			'works-active' : true,
			'about-active' : false
		})


		return (
			<div className={classnames}>
				<div className="content-container">
				{
					this.state.sections.map((section, index) => {
						return section;
					})
				}
				</div>
				<div className="menu-container" >
					<div className="menu-logo-container">
						<div className="wrapper">
							<img className="menu-logo-u" src="assets/img/logo-u.svg" />
							<img className="menu-logo-x" src="assets/img/logo-x.svg" />
						</div>
					</div>
					<div className="menu-works-container menu-block" >
						<div className="menu-wrapper" onMouseOver={this.showMenuList} onMouseOut={this.hideMenuList}>
							<div className="menu-label">
								<span className="menu-label__st">W</span>
								<span className="menu-label__nd">orks</span>
							</div>
							<div className="menu-hamburger-icon" >
								<div className="hamburger"></div>
							</div>
							<div className="menu-counter">{
								this.sections.map((section, index) => {
									return <div key={index} className={ "menu-counter__index " + (
										(index < this.currentSection) ? "menu-counter__index--less" : 
										(index > this.currentSection) ? "menu-counter__index--more" :
										"menu-counter__index--active"
									)}>{ index + 1 }</div>;
								})
							}</div>
						</div>
					</div>
					<div className="menu-about-container menu-block">
						<div className="menu-wrapper">
							<div className="menu-label">
								<span className="menu-label__st">A</span>
								<span className="menu-label__nd">bout</span>
							</div>
							<div className="menu-hamburger-icon">
								<div className="hamburger"></div>
							</div>
							<div className="menu-counter">{
								this.sections.map((section, index) => {
									return <div key={index} className={ "menu-counter__index " + (
										(index < this.currentSection) ? "menu-counter__index--less" : 
										(index > this.currentSection) ? "menu-counter__index--more" :
										"menu-counter__index--active"
									)}>{ index + 1 }</div>;
								})
							}</div>
						</div>
					</div>

					<MenuList sections={this.sections} />
				</div>
			</div>
		)
	}
}