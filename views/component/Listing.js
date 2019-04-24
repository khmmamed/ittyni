import React, { Component } from 'react';
import styled, {css} from 'styled-components';

const infoSlide = css`
	transform : translateX(50px);
	transition : transform 2s;
`

const StyledList = styled.div`
	margin 	: 25px 0 0 0;
	display : flex;


	& > .icon { 

		width : 40px;
		text-align : center;

		& > i {

			font-size : 30px;
			color : red;

		} 

		& > img { height : '40px'; }
	}
	& > .body { 

		width : 70%;
		border-bottom	: 2px solid rgba(158, 158, 158, 0.62);
		margin-left : 15px;

		& > h3 {

			margin : 0;
			font-size : 18px;
		}

		& > .description {

			font-size : 12px;
			padding-left : 15px;
		}
	}
	& > .info {

		width : 20%; 
		border-bottom	: 2px solid rgba(158, 158, 158, 0.62);
		font-size : 14px;
		color : blue;
		
	}
`

export default class Listing extends Component {

	render(){

		const { 
			children, 
			clickToImg
		} = this.props
		const props = this.props
		return (

			<StyledList

				{...props}
			>

				{ children }

			</StyledList>

		)
	}

}