import React,{Component} from 'react';
import styled from 'styled-components';

const StyledNavItem = styled.div`
	width : 50%;
	text-align : right;
`

export default ({children}) =>(

	<StyledNavItem>

		{children}

	</StyledNavItem>

)