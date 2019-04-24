import React,{Component} from 'react';
import styled from 'styled-components';

const StyledNav = styled.div`
	margin-left : 100px;
	width : 50%;
	text-align : left;
`

export default ({children}) =>(

	<StyledNav>

		{children}

	</StyledNav>

)