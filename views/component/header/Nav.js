import React,{Component} from 'react';
import styled from 'styled-components';

const StyledNav = styled.nav`
	
	display : flex;
	
`

export default ({children}) =>(

	<StyledNav>

		{children}

	</StyledNav>

)