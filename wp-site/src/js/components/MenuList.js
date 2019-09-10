import React, { Component, PropTypes } from 'react';
import classNames from "classnames";

export default class Menu extends Component {

	selectMenuItem(index) {
		this.props.onSelect(index);
	}

	render() {
		const props = this.props;
		const classnames = classNames({
			[props.className]: props.className != undefined,
			'menu-list-container' : true,
			'menu-list-container--active' : props.active
		})

		let barStylePos = { 
			height : Math.round(props.currentSection / (props.sections.length - 1) * 100) + '%'
			//top : Math.round(props.currentSection) + '%'

		}

		let shift = 10;
		let A = props.currentSection / (props.sections.length - 1);
		let barStyle = { 
			top : ((1 - A) * (30) + A * 60) + "vh"
		}
		if (!props.showMenu)	barStyle = { top : "100vh"};

		return (
			<div className={classnames} onWheel={this.props.onWheel}>
				<div className="menu-scroll-pos" style={barStyle}>
					<div className="menu-scroll-current">{ props.currentSection + 1 }</div>
					<div className="menu-scroll-bar"  >
						<div className="menu-scroll-bar__pos" style={barStylePos} ></div>
					</div>
					<div className="menu-scroll-total">{ props.sections.length }</div>
				</div>
				<div className="wrapper">
					{
						props.sections.map((section, index) => {
							var result = section.menuTitle.split('');
							return <div key={index} onClick={this.selectMenuItem.bind(this, index)} className={ "menu-list-item " + (
								(index < props.currentSection) ? "menu-list-item--less" : 
								(index == props.currentSection -1) ? "menu-list-item--prev" : 
								(index == props.currentSection + 1) ? "menu-list-item--next" :
								(index > props.currentSection) ? "menu-list-item--more" : 
								(index == props.currentSection) ? "menu-list-item--active" :
								""
							)}>{ 
							result.map((glyph, index) => {
								var number = index % 4 + 1;
								return <span key={index} className={"menu-list-item-glyph el-" + number} >{ glyph }</span>
							})
						}</div>;
						})
					}
				</div>
			</div>
		)
	}
}
