import React, { Component } from 'react';
import styled, {css} from 'styled-components';

const StyledBox = styled.div`
	width : ${props=>props.width.default};

	@media (min-width: 992px) {
		display : ${props=>props.hideLarge ? 'none' : ''};
		width  	: ${props => props.width.lg};
	}
	@media (min-width: 772px) and (max-width: 992px) {
		display : ${props=>props.hideMedium ? 'none' : ''};
		width  	: ${props => props.width.md};
	}
	@media (min-width: 442px) and (max-width: 772px) {
		display : ${props => props.hideSmall ? 'none' : ''};
		width  	: ${props => props.width.sm};
	}
	@media (min-width: 268px) and (max-width: 442px) {
		display : ${props=>props.hideXSmall ? 'none' : ''};
		width  	: ${props => props.width.xs};
	}
`

const Box = (props)=>{

	return(

		<StyledBox
			{...props}
		>

			{props.children}

		</StyledBox>
	)
}

export default Box