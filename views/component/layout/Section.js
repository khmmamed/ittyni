import React, {Component} from "react"
import proptypes from "prop-types"
import styled, {css} from "styled-components"

const StyledSection = styled.section`
	
	margin : ${props=> props.margin};
	min-height : ${props=> props.height};
	border : ${props=> props.border};

	&.carousel {
		width: 100%;
	    background: #fcfcfc;
	    position: relative;
	    margin-left: 0;
	    margin-right: 0;
	    margin-bottom: 0;
	    margin-top : 125px;
	    padding: 0;
	}
	& > .fit {
		width : 100%;
		height : 100%;
	}

	&.home {
		padding-top: 50px;
		display:block;
	    position:relative;
	    z-index:120;
		background-color: #fff;
		margin-left: 30px;
		margin-right : 30px;
		margin-top : -50px;
	}
`
/**
 **margin
 **width, heigth
 **padding
 **background
 	@media (min-width: 992px) {background-color : red; }
	@media (min-width: 772px) and (max-width: 992px) {background-color : blue; }
	@media (min-width: 442px) and (max-width: 772px) {background-color : black; }
	@media (min-width: 268px) and (max-width: 442px) {background-color : white; }
 **border
 **position
 **visible
 **/
class Section extends Component {

	render(){

		const props = this.props;
		const {classNames, classContainer} = this.props;
		const styles = {};
		
		//const debug = {...props, border:1};
		
		return	(			
			<StyledSection 
				id={props.id} 
				{...props}
			>

				{props.children}

			</StyledSection>
		)		
	}
}



export default Section;