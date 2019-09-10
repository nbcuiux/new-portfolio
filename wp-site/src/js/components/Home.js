import React, { Component, PropTypes } from 'react';
import LayoutMain from "./LayoutMain"
import {Route, IndexRoute} from "react-router";


import ReactDOM from 'react-dom'
import classNames from "classnames";
import $ from "jquery";
import { collision, inFocus, Timer, isServer, getMinScale, generateFictionTitle } from "../client/utils";
import { Link } from "react-router-dom"


import Greeting from "./Greeting";
import Work from "./Work";
import Projects from "./Projects";
import Feedback from "./Feedback";
import Footer from "./Footer";
import CounterSection from "./CounterSection";
import SliderSection from "./SliderSection";
import ExpandableSection from "./ExpandableSection";
import Menu from "./Menu";
import SectionWrapper from "./SectionWrapper";
import BodyClass from "./BodyClass";
import createHistory from 'history/createBrowserHistory'

const bpXlarge = 1800;
const bpLarge = 1400;
const bpDesktop = 1100;
const bpMedium = 800;
const bpSmall = 600;
const bpXsmall = 480; // for isMobile

const SVG_BK_WIDTH = 1200;
const SVG_BK_HEIGHT = 800;



function formatDataFromProps (_data) {


	let sections = [];

	let content = _data.wpContent[0];
	let context = _data.wpContext;

	function getTagName(tagId) {
		let tagObj = context.tags.find(tag => {
			return tag.term_id === tagId
		})
		return tagObj ? tagObj.name : null
	}

	var greetingsData = {
		module : Greeting,
		menuTitle : "About",
		props : {
			className : "greeting",
			slogan : content.intro_slogan
		}
	}
	sections.push(greetingsData);

	

	


	


	for (let i = 0; i < content.portfolio_items.length; i++) {
		let workItem = content.portfolio_items[i];

		console.log(workItem.cover_image.url);
		sections.push({
			module : Work,
			menuTitle : workItem.title,
			renderer : null,
			stage : null,
			slug: workItem.slug,
			animation : {
				timer : null,
				start : 0,
				end : 0,
				cur : 0
			},
			props : {
				className : "", //need to add to wordpress
				title : workItem.title,
				description : workItem.description,
				image : workItem.cover_image.url, 
				//bk : workItem.background_symbol, //need to add to wordpress
				bk : "assets/img/chiller-letter.svg", //need to add to wordpress
				urlName : workItem.cta_text, //need to add to wordpress
				url : workItem.site_link,
				categories  : workItem.tags.map(tagId => getTagName(tagId))
			}
		});
	}

	

	var expandableSectionData = {
		module : ExpandableSection,
		slug: null,
		menuTitle : "Skills",
		props : {
			className : "",
			slogan : content.intro_slogan,
			items : content.intro_points
		}
	}
	sections.push(expandableSectionData);


	var counterSectionData = {
		module : CounterSection,
			slug: null,
		menuTitle : "Our works",
		props : {
			className : "counter",
			projectsCount : context.options.projects.length,
			emloyeesCount : context.options.team.length
		}
	}
	sections.push(counterSectionData);

	// projects
	var projectsData = {
		module : Projects,
		menuTitle : "Our Projects",
		slug: null,
		props : {
			className : "projects",
			title : "Projects",
			description : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
			projects : context.options.projects
		}
	}
	sections.push(projectsData);

	var sliderData = {
		module : SliderSection,
		menuTitle : "Team",
		props : {
			className : "slider",
			title : "Meet the team",
			items : [
				{
					name : "Relavola",
					title : "Murmur mur",
					img : "assets/img/img-1.jpg"
				},
				{
					name : "Laroopaqa",
					title : "Halabum",
					img : "assets/img/img-2.jpg"
				},
				{
					name : "Jerrezo",
					title : "Meow Hola",
					img : "assets/img/img-3.jpg"
				},
				{
					name : "Popombo",
					title : "Uzulala",
					img : "assets/img/img-4.jpg"
				}
			]
		}
	}
	sections.push(sliderData);

	//deedback

	var feedbackData = {
		module : Feedback,
		menuTitle : "Contact Us",
		slug: null,
		props : {
			className : "feedback",
			title : context.options.contact_slogan,
			placeholder : context.options.contact_email
		}
	}
	sections.push(feedbackData);
	


	var footerData = {
		module : Footer,
		menuTitle : "Address",
		slug: null,
		props : {
			className : "footer",
			address : context.options.address,
			city : "New York",
			nextLink : "About"
		}
	}
	sections.push(footerData);
	
	return sections;


}












export default class App extends Component {

	sections = []

	constructor(props) {
		super(props);

		if (!isServer()) {
			this.history = createHistory();
		}

		//this.loadData(props);

		if (props.wpContent && props.wpContext) {
			this.sections = formatDataFromProps(props);
		}

		this.state = {
			currSectionIndex: 0,
			showMenu: false
		}
	}



	componentDidMount() {

		this.onScroll();
		this.autoScrollFromRoute();

		//require

		document.addEventListener('scroll', this.onScroll);

	}

	componentWillUnmount() {
		document.removeEventListener('scroll', this.onScroll);
	}

	autoScrollFromRoute = () => {
		const match = this.props.routeProps.match;
		const slug = match.params.slug;

		if (!slug) {
			return;
		}

		const initialSectionIndex = this.sections.findIndex(section => {
			return section.slug === slug;
		})

		if (initialSectionIndex !== -1) {
			this.smoothScrollToIndex(initialSectionIndex);
			//this.autoScrollToSection(initialSectionIndex);
		}
	}

	smoothScrollToIndex = (index) => {
		let scrollTop = $(this.sections[index].el).offset().top;
		$("body").animate({
			scrollTop: scrollTop
		}, 1000);
	}


	componentWillReceiveProps(nextProps) {
		if (nextProps.wpStatus !== this.props.wpStatus && nextProps.wpStatus === 2) {
			this.sections = formatDataFromProps(nextProps);
		}
	}

	componentDidUpdate(prevProps, prevState) {

		if (prevProps.routeProps !== this.props.routeProps) {
			this.autoScrollFromRoute();
			return;
		}

		
		if (prevState.currSectionIndex !== this.state.currSectionIndex) {
			if (this.sections[this.state.currSectionIndex].slug) {
				this.history.push("/"  + this.sections[this.state.currSectionIndex].slug);
			}
			else {
				this.history.push("/");
			}
		}
	}

	updateTitle = (_title) => {
		document.title = _title;
	}
	
	registerSection = (index, el) => {
		this.sections[index].el = el;
	}

	onScroll = (e) => {
		if (this.state.showMenu) return 0;

		//check for focus change
		for (let i = 0; i < this.sections.length; i++) {
			let section = this.sections[i];
			let element = section.el;
			let collided = inFocus(element);
			if (collided) {
				if (this.state.currSectionIndex != i)
					this.setState({ currSectionIndex: i });
				
				break;
			} 
		}

		//check for logo hide/show
		var container = $(".app-container");
		var scrollTop = $(window).scrollTop();

		if (scrollTop < 50) {
			container.addClass("show-logo");
		} else {
			container.removeClass("show-logo");
		}
	}


	//menu functions
	menuScroll = 0;
	sectionStep = 600;

	showMenuList = (e) => {
		this.menuScroll = this.state.currSectionIndex * this.sectionStep;
		this.setState({
			showMenu: true
		})
	}
	hideMenuList = (e) => {
		this.menuScroll = this.state.currSectionIndex * this.sectionStep;
		this.setState({
			showMenu: false
		})
	}

	menuOnWheel = (e) => {
		if (isServer()) return 0;

		let {currSectionIndex} = this.state;

		this.menuScroll = Math.max(0, Math.min(this.sectionStep * (this.sections.length - 1), this.menuScroll + e.deltaY));
		let newSection = Math.round(this.menuScroll / this.sectionStep);

		console.log("newSection = ", newSection, "this.menuScroll  = ", this.menuScroll, "this.sectionStep = ", this.sectionStep);

		if (newSection !== currSectionIndex) {
			//scroll and update state
			this.autoScrollToSection(newSection);	
			this.setState({
				currSectionIndex: newSection
			});		
		}

	}

	onSelectMenuItem = (index) => {
		this.autoScrollToSection(index);
		this.setState({
			currSectionIndex: index,
			showMenu: false
		});
	}

	autoScrollToSection = (sectionIndex) => {
		let scrollTop = $(this.sections[sectionIndex].el).offset().top;
		$(window).scrollTop(scrollTop);
	}

	render() {

		const {showMenu} = this.state;

		const classnames = classNames({
			'app-container' : true,
			'works-active' : true,
			'about-active' : false
		})


		return (
			<div>
				{
					showMenu ?
						<BodyClass className="show-menu" />
					:
						null
				}


				{
					this.props.wpStatus === 2 ?
						<div className={classnames}>
							<div className="content-container">
								{
									this.sections.map((section, index) => {
										//return section.instance;
										return (
											<SectionWrapper 
												active={this.state.currSectionIndex === index} 
												key={index} 
												index={index} 
												section={section} 
												registerSection={this.registerSection}
											>
											</SectionWrapper>
										)
									})
								}
							</div>
							<Menu 
								showMenuList={this.showMenuList}
								hideMenuList={this.hideMenuList}
								sections={this.sections}
								currentSection={this.state.currSectionIndex}
								showMenu={showMenu}
								onWheel={this.menuOnWheel}
								onSelectMenuItem={this.onSelectMenuItem}
							/>
						</div>
					:
						<div>Loading...</div>
				}
			</div>
		)
	}
}