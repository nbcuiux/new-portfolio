import React, { Component, PropTypes } from 'react';
import classNames from "classnames";

import { Timer, isServer } from "../client/utils";
import $ from "jquery";

export default class SliderSection extends Component {
	dom = {
		container : null,

		sliders : null,
		wrapper : null
	}

	timer = null
	itemsToShow = 3
	position = 0
	speed = -0.06
	defaultSpeed = 0.06
	dragging = false
	initialHeight = 0
	initialWidth = 0
	initialized = false
	scale = 1.0

	mousePos = {
		mouseXF1: 0,
		mouseYF1: 0,
		mouseXF2: 0,
		mouseYF2: 0
	}

	animationTick = 0
	animationB1 = 0
	animationFric = 0.9

	prevPos = 0
	nextPos = 0


	constructor(props) {
		super(props);

		if (!isServer()) {
			window.addEventListener('resize', this.onWindowResize);
		}

		this.timer = new Timer(1000/40, 0);
		this.timer.onTimerEvent = this.onTimerEvent;
	}

	onFocus = (e) => {}
	onBlur = (e) => {}


	componentDidMount() {
		

		this.dom.sliders = $(this.dom.container).find(".slider-content-container");

		this.initialHeight = $(this.dom.sliders).height();
		this.initialWidth = $(this.dom.sliders).width();
		console.log("initialWidth = ", this.initialWidth);


		this.dom.wrapper = $(this.dom.container).find(".slider-content-wrapper");

		$(this.dom.container).find("img").on("dragstart", function(e) { return false; });

		this.timer.start();
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


	setPositions = (_pos) => {
		// if itemsToShow > props.items.length => fixed width
		let width = $(this.dom.container).width();
		let height = this.initialHeight;

		var widthOfItemsToShow = 0;
		let itemsDOM = $(this.dom.container).find(".slider-item-wrapper");
		for (let i = 0; i < this.itemsToShow; i++) {
			widthOfItemsToShow += $(itemsDOM[i]).width();
		}


		let scale = width/widthOfItemsToShow;
		this.scale = scale;

		var p1, p2;
		if (_pos < 0) {
			p1 = _pos;
			p2 = _pos + 100;
		} else {
			p1 = _pos;
			p2 = _pos - 100;
		}

		

		let slider1 = $(this.dom.sliders[0]);
		let slider2 = $(this.dom.sliders[1]);

		slider1.css({ 
			transform : "scale(" + scale + ") translateX(" + p1 + "%)"
			//position: "absolute"
		});
		slider2.css({ 
			transform : "scale(" + scale + ") translateX(" + p2 + "%)"
			//position: "absolute"
		});


		$(this.dom.wrapper).css({
			height : (height * scale) + "px"
		});
		//scale

		if (!this.initialized) {
			this.initialized = true;
			$(this.dom.container).addClass("slider-container--initialized");
		}
	}

	onTimerEvent = (e) => {
		let dX = this.mousePos.mouseXF2 - this.mousePos.mouseXF1;
		let dY = this.mousePos.mouseYF2 - this.mousePos.mouseYF1;


		if (this.dragging) {
			let bDx = (dX / this.initialWidth / this.scale * 100);
			this.nextPos = this.prevPos + bDx;

			let newPos = (1 - this.animationFric) * this.nextPos + this.animationFric * this.position;
			this.speed = newPos - this.position;
			this.position = newPos;
			
		} else {
			this.position = this.position + this.speed;
			this.speed = (1 - this.animationFric) * Math.sign(this.speed) * this.defaultSpeed + this.animationFric * this.speed;
			this.position = this.position % 100.0;
		}
		


		
		this.setPositions(this.position);
	}

	mouseUp = (e) => {
		this.dragging = false;
		this.mousePos.mouseXF2 = e.pageX;
		this.mousePos.mouseYF2 = e.pageY;
	}

	mouseDown = (e) => {
		this.dragging = true;
		$(this.dom.container).addClass("hide-tip");1
		this.mousePos.mouseXF1 = e.pageX;
		this.mousePos.mouseYF1 = e.pageY;
		this.mousePos.mouseXF2 = e.pageX;
		this.mousePos.mouseYF2 = e.pageY;
		this.prevPos = this.position;
	}

	mouseMove = (e) => {
		if (this.dragging) {
			console.log("Dragging");
			this.mousePos.mouseXF2 = e.pageX;
			this.mousePos.mouseYF2 = e.pageY;

			console.log(this.mousePos.mouseXF2);
		}


		e.stopPropagation();
		e.preventDefault();
	}

	onWindowResize = (e) => {
		this.setPositions(e);
	}


	render() {

		const props = this.props;

		const classnames = classNames({
			[props.className]: props.className != undefined,
			'section-container' : true,
			'slider-container': true
		})

		return (
			<section 
				className={classnames} 
				ref={ (el) => {this.dom.container = el} }
				onMouseDown={this.mouseDown}
				onMouseUp={this.mouseUp}
				onMouseMove={this.mouseMove}
				onMouseLeave={this.mouseUp}
				>
				<div className="title-container">{ props.title }</div>
				<div className="slider-content-wrapper">
					<div className="slider-content-container" >
					{
						props.items.map((item, index) => {
							return (
								<div key={index}  className="slider-item-wrapper">
									<div className="slider-item">
										<img className="slider-item__image" src={item.img} />
										<div className="slider-item__info" >
											{/*
											<div className="slider-item__name">{ item.name }</div>
											<div className="slider-item__title">{ item.title }</div>
										*/}
										</div>
									</div>
								</div>
							)
						})
					}
					</div>

					<div className="slider-content-container" >
					{
						props.items.map((item, index) => {
							return (
								<div key={index}  className="slider-item-wrapper">
									<div className="slider-item">
										<img className="slider-item__image" src={item.img} />
										<div className="slider-item__info" >
											{/*
											<div className="slider-item__name">{ item.name }</div>
											<div className="slider-item__title">{ item.title }</div>
										*/}
										</div>
									</div>
								</div>
							)
						})
					}
					</div>
				</div>
				<div className="slider-tip-container">
					<div className="slider-tip-text">DRAG</div>
				</div>


			</section>
		)

	}

}
