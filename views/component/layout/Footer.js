import React, {Component} from "react"
import propTypes from "prop-types"
import styled, {css} from "styled-components"

const StyledFooter = styled.footer`

	padding : 50px 0 0;
	background-color : ${props=> props.bg};

	${props=> props.fixed ? FixedFoooter : ''}

`
const FixedFoooter = css`
  position:fixed; 
  bottom:0; 
  width:100%; 
`

const Footer = (props) =>{

	const { children } = props 

	return(

		<StyledFooter

			{...props}
		>

			{children}

		</StyledFooter>
	)
}

StyledFooter.propTypes = {
	
	fixed : propTypes.bool
}

StyledFooter.defaultProps ={
	bg : '#f2f2f2'
}


export default Footer;