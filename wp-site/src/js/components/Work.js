import React, { Component, PropTypes } from 'react';
import classNames from "classnames";

import { getMinScale } from "../client/utils";
import { Timer, isServer, generateFictionTitle } from "../client/utils";
import $ from "jquery";


const SVG_BK_WIDTH = 2400;
const SVG_BK_HEIGHT = 1600;

export default class Work extends Component {
	dom = {
		container : null,

		title : null,
		canvas : null
	}

	timer = null
	delayTimeout = 0
	animation = {
		timer : null,
		start : 0,
		end : 0,
		cur : 0
	}

	renderer = null
	stage = null
	camera = null
	logo = null
	graphics = null

	titleTimer = null


	constructor(props) {
		super(props);

		let frames = 10;
		this.timer = new Timer(1000/frames/3, frames*1.5);
		this.timer.onTimerEvent = this.onTimerEvent;

		this.titleTimer = new Timer(1000/10, 10*1);
		this.titleTimer.onTimerEvent = this.onTitleTimer;

		if (!isServer()) {
			require("pixi.js", function (data) {});
			window.addEventListener('resize', this.onWindowResize);
		}
	}

	componentDidMount() {
		this.initPIXI();
		this.onWindowResize();
	}

	initPIXI() {

		let title = $(this.dom.container).find(".work-title");
		this.dom.title = title;
		let canvas = $(this.dom.container).find(".work-symbol"); 
		this.dom.canvas = canvas;
		let canvasContainer = $(this.dom.container).find(".work-symbol-container"); 
		this.dom.canvasContainer = canvasContainer;

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
		this.renderer = renderer;

		let stage = new PIXI.Container();
		this.stage = stage;
		var camera = new PIXI.Container();
		this.camera = camera;
		//camera.anchor.set(0);

		this.renderer = renderer;
		this.stage = stage;
		this.camera = camera;


		let textureURL = this.props.bk;
		//let textureURL = "assets/img/chiller-letter.svg";

		let texture = PIXI.Texture.fromImage(textureURL);
		let logo = new PIXI.Sprite(texture);
		this.logo = logo;
		logo.anchor.set(0.5);

		//logo.x = w /2;
		//logo.y = h / 2;

		let graphics = new PIXI.Graphics();
		this.graphics = graphics;
		let cover = 4;
		graphics.beginFill(0xFFFFFF);
		graphics.drawRect(-cover*w, -cover*h, 2*cover*w, 2*cover*h);

		stage.addChild(camera);
		camera.addChild(graphics);
		camera.addChild(logo);
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

	onWindowResize = (e) => {
		let canvas = this.dom.canvas;
		let element = this.dom.canvasContainer;

	
		let w = element.width();
		let h = element.height();

		let obj = {
			w : SVG_BK_WIDTH,
			h : SVG_BK_HEIGHT
		};
		let wnd = {
			w : w,
			h : h
		}
		
		let scaleToApply = getMinScale(obj, wnd);
		this.camera.y = h*0.5;
		this.camera.x = w*0.5;
		

		this.camera.scale.x = scaleToApply;
		this.camera.scale.y = scaleToApply;

		canvas.attr("width", w);
		canvas.attr("height", h);

		//section.renderer.view.style.scale.x = scaleToApply;
		//section.renderer.view.style.scale.y = scaleToApply;

		this.renderer.view.style.width = w;
		this.renderer.view.style.height = h;
		this.renderer.resize(w, h);
		this.renderer.render(this.stage);
	}


	onFocus = (e) => {
		let timer = this.timer;


		if (this.delayTimeout == 0) {
			this.delayTimeout = setTimeout((e) => {
				timer.reset();
				this.animation.start = this.animation.cur;
				this.animation.end = 1.0;
				timer.start();
				this.delayTimeout = 0;
			},2000);
		}
		

		this.titleTimer.reset();
		this.titleTimer.start();
	}
	onBlur = (e) => {
		if (this.delayTimeout !=0) {
			clearTimeout(this.delayTimeout);
			this.delayTimeout = 0;
		}
		let timer = this.timer;

		timer.reset();
		this.animation.start = this.animation.cur;
		this.animation.end = 0.0;
		timer.start();

		if (this.delayTimeout !=0) {
			clearTimeout(this.delayTimeout);
			this.delayTimeout = 0;
		}
	}
	onTimerEvent = (e) => {
		let A = e.currentCount/e.repeatCount;
		let B = (Math.sin((A - 0.5) * Math.PI) + 1) * 0.5;
		this.animation.cur = B * this.animation.end + (1 - B) * this.animation.start;
		let C = this.animation.cur;



		this.graphics.alpha = 0.2 + 0.8 * C;
		this.logo.alpha = 1.0;
		this.logo.scale.x = 1 + 0.2 * (1 - C);
		this.logo.scale.y = 1 + 0.2 * (1 - C);

		if (C == 0.0) {
			this.logo.alpha = 0;
			this.graphics.alpha = 1;
			this.dom.canvas.css({ visibility : 'hidden' });
		} else if (C == 1.0) {

		} else {
			this.dom.canvas.css({ visibility : 'visible' });
			
		}

		this.renderer.render(this.stage);
	}

	onTitleTimer = (e) => {
		let A = e.currentCount/e.repeatCount;


		if (A == 0.0) {
			this.dom.title.html(generateFictionTitle(this.props.title));
		} else if (A == 1.0) {
			this.dom.title.html(this.props.title);
		} else {
			this.dom.title.html(generateFictionTitle(this.props.title));
		}
	}

	render() {

		const props = this.props;

		const classnames = classNames({
			[props.className]: props.className != undefined,
			'section-container' : true,
			'work-container': true
		})


		var result = props.description.split(' ');
		return (
			<section 
				className={classnames} 
				ref={ (el) => {this.dom.container = el}} >
				<div className="work-symbol-container">
					<canvas className="work-symbol"></canvas>
				</div>
				<div className="work-info-container">
					<div className="wrapper">
						<div className="work-categories-container">
							{
								props.categories.map((category, index) => {
									return <div key={index} className="work-category">{ category }</div>;
								})
							}
						</div>
						<div className="work-title">{ props.title }</div>
						<div className="work-description">{  
							
							result.map((text, index) => {
								var number = index % 4 + 1;
								return <span key={index} className={"text-block text-block-" + number} >{ text } </span>
							})
						}
						</div>
						<div className="work-link-container">
							<a href={ props.url } className="work-link">{ props.urlName }</a>
						</div>
					</div>
				</div>
				<div className="work-image-container">
					<div className="work-image-wrapper">
						<img src={ this.props.image } className="work-image" />
					</div>
				</div>
			</section>
		)
	}
}