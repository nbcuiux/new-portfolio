import React, { Component, PropTypes } from 'react';
import classNames from "classnames";
import { Link } from "react-router-dom";
import MenuList from "./MenuList";

export default class Menu extends Component {

	toggleMenu = (e) => {
		if (this.props.showMenu) {
			this.props.hideMenuList();
		}
		else {
			this.props.showMenuList();
		}
	}

	render() {

		const props = this.props;

		const classnames = classNames({
			[props.className]: props.className != undefined,
			'menu-container' : true,
			'menu-container--open' : this.props.showMenu
		})

		return (
			<div className={classnames} >
				<div className="menu-logo-container">
					<div className="wrapper">
						{/* 
						<img className="menu-logo-u" src="assets/img/logo-u.svg" />
						<img className="menu-logo-x" src="assets/img/logo-x.svg" /> */}
						<video className="menu-logo-video" loop autoPlay >
							<source src="assets/img/cmp.mp4" type="video/mp4" />
						</video>
					</div>
				</div>
				<div className="menu-works-container menu-block" >
					<div className="menu-wrapper" onClick={this.toggleMenu}>
						<div className="menu-label">
							<span className="menu-label__st">W</span>
							<span className="menu-label__nd">orks</span>
						</div>
						<div className="menu-hamburger-icon" >
							<div className="hamburger"></div>
						</div>
						<div className="menu-counter">{
							props.sections.map((section, index) => {
								return <div key={index} className={ "menu-counter__index " + (
									(index < props.currentSection) ? "menu-counter__index--less" : 
									(index > props.currentSection) ? "menu-counter__index--more" :
									"menu-counter__index--active"
								)}>{ index + 1 }</div>;
							})
						}</div>
					</div>
				</div>
				<div className="menu-about-container menu-block">
					<div className="menu-wrapper">
						<Link to="/about">
							<div className="menu-label">
								<span className="menu-label__st">A</span>
								<span className="menu-label__nd">bout</span>
							</div>
							<div className="menu-hamburger-icon">
								<div className="hamburger"></div>
							</div>
						</Link>
						<div className="menu-counter">{
							props.sections.map((section, index) => {
								return <div key={index} className={ "menu-counter__index " + (
									(index < props.currentSection) ? "menu-counter__index--less" : 
									(index > props.currentSection) ? "menu-counter__index--more" :
									"menu-counter__index--active"
								)}>{ index + 1 }</div>;
							})
						}</div>
					</div>
				</div>

				<MenuList 
					onWheel={props.onWheel} 
					onSelect={props.onSelectMenuItem}
					sections={props.sections} 
					showMenu={props.showMenu} 
					currentSection={props.currentSection}  />
			</div>
		)
	}
}