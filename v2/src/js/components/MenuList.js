import React, { Component, PropTypes } from 'react';
import classNames from "classnames";

export function MenuList (props) {
	const classnames = classNames({
		[props.className]: props.className != undefined,
		'menu-list-container' : true,
		'menu-list-container--active' : props.active
	})

	console.log(props);

	return (
		<div className={classnames} >{
			props.sections.map((section, index) => {
				var result = section.menuTitle.split('');
				console.log(section.menuTitle);
				return <div key={index} className="menu-list-item">{ 
					result.map((glyph, index) => {
						var number = index % 4 + 1;
						return <span key={index} className={"menu-list-item-glyph el-" + number} >{ glyph }</span>
					})
				}</div>;
			})}
		</div>
	)
}
