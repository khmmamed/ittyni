import React, {Component} from 'react'
import {render} from 'react-dom'

//Loading Layouts
import Header from './component/layout/Header'
import Footer from './component/layout/Footer'
import Section from './component/layout/Section'
import Box from './component/layout/Box'
import Container from './component/layout/Container'
import Col from './component/layout/Col'
import Row from './component/layout/Row'

//Loading Components
import { Searching } from './component/Search';
import Listing from './component/Listing';
import Nav from './component/header/Nav';
import NavItem from './component/header/NavItem';
import Logo from './component/header/Logo';

//Loading Redux for Store Management
import {createStore} from "redux"
import { rootReducer, middleware, Here, getUser} from "./store/Home/reducer"
import { Provider, connect } from "react-redux";

const store = createStore(rootReducer, middleware)

console.log(store.getState())

class Index extends Component{

	componentWillMount(){
		this.props.Here();
	}

	render(){

		const { tests, fetching } = this.props.reducer;
		const { user } = this.props.Header;

		return(
			<div>
				<Header style={{
					fontSize : '25px', 
					fontWeight : 'bold', 
					borderBottom : '2px solid #9e9e9e9e',
					textAlign: 'center',
					padding : '15px'
				}}
				>
					<Nav>
						<Logo>i<span style={{color : 'red'}}>TT</span>yni</Logo>
						<NavItem><i className={user.status} onClick={e=>this.props.getUser()}/> Sign In</NavItem>
					</Nav>
				</Header>
				<Section id="Search" margin='80px 0 0'>	<Container> <Searching /> </Container></Section>
				<Section id="main" margin='10px 0 50px 0'>	
					<Container><div  style={{
						    display: 'flex'
					}}>
						<Box 
							id="content" 
							width={{default : '75%', lg : '75%', md : '75%', sm : '100%', xs : '100%'}}
							style={{
    							marginRight: '25px',
    							borderTop: '1px solid gray'
						}}>
							
							{tests.length>0 ? tests.map(test => (
								<Listing key={test.mnemonic}>
									<div className="icon"><img src="img/biochem.png" height="40px"/></div>
									<div className="body">
										<h3>{test.mnemonic}</h3>						
										<div className="description">{test.nameFr}</div>						
									</div>
									<div className="info"> {Math.floor(test.bcode * 1.2)} MAD </div>
								</Listing>)) : <i style={{fontSize : '28px', color : 'red', marginTop : '15px'}} className={fetching} />}	
							
						</Box>
						<Box 
							id="menu" 
							width = {{default : '25%', lg : '25%', md : '25%', sm: '0', xs : '0'}}
							style={{
    							paddingLeft: '15px'
							}}
							hideSmall
							hideXSmall
						>  </Box></div>
					</Container>
				</Section>	
				<Footer fixed bg='#fff' 
						style={{borderTop : '3px solid #9e9e9e9e', padding : '15px', textAlign:'center', backgroundColor : '#fff'}}>
					Created By khm@med Co(r)p.
				</Footer>
			</div>
		)
	}
}

const mapStateToProps = (state)=>({...state})

const App = connect(mapStateToProps,{Here, getUser})(Index);

//render page to website
render(
	<Provider store={store}>
		<App /> 
	</Provider>, document.getElementById('MedApp'))