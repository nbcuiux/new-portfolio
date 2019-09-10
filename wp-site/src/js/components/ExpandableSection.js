import React, { Component, PropTypes } from 'react';
import classNames from "classnames";
import $ from "jquery";

export default class ExpandableSection extends Component {
	dom = {
		container : null
	}

	constructor(props) {
		super(props);
	}

	componentDidMount() {  
		let items = $(this.dom.container).find(".expandable-item");
		items.click(function(e) {
			let switcherClass = "expandable-item--collapsed";
			let state = $(this).hasClass(switcherClass);
			items.addClass(switcherClass);

			console.log(this);

			if (state) {
				$(this).removeClass(switcherClass);
			}
		});
	}
	render() {

		const props = this.props;
		const classnames = classNames({
			[props.className]: props.className != undefined,
			'section-container' : true,
			'expandable-container': true
		})
		console.log("RENDER");
		return (
			<section 
				className={classnames} 
				ref={ (el) => {this.dom.container = el}}
				key={props.key}>
				<div className="slogan-container">{ props.slogan }</div>
				<div className="expandable-items-container">
					{
						props.items.map((item, index) => {
							return <div key={index} className="expandable-item expandable-item--collapsed">
								<div className="expandable-item__name"><i className="fa fa-caret-down"></i><span className="expandable-item__label">{ item.heading }</span></div>
								<div className="expandable-item__description">{ item.paragraph }</div>
							</div>;
						})
					}
				</div>
			</section>
		)
	}
}