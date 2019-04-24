import React, {Component} from "react"
import proptypes from "prop-types"
import styled, {css} from "styled-components"

const Bluebg = css`
	color : blue;
`

const StyledHeader = styled.header`
	
	z-index: 100;
	position: fixed;
	left: 0;
	top: 0;

	width: 100%;
	height: 60px;

	border-bottom: 1px solid #f6f6f6;
	color: #484848;
	stroke: #484848;
	background: #fff;
`



const Header = ( props ) => {

	const {children, style} = props

	return(

		<StyledHeader 

			style = { style }
			{...props}

		> 
		
		 { children } 

		</StyledHeader>
	)
}



export default Header;