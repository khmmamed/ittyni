import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {
	Row,
	Col
} from 'reactstrap';
import {
	LayoutHeader, 
	LayoutMain, 
	LayoutContainer, 
	LayoutContent, 
	LayoutFooter,
	sLayout
} from './ui/layout/Layout';
import axios from 'axios';
import {
	Portlet, 
	PortletTitle, 
	PortletActions, 
	PortletBody, 
	LightPortlet, 
	Caption
} from './styles/Portlet';
import {
	PageHeader, 
	Navbar, 
	NavbarFixedTop, 
	Logo,
	TopMenu, 
	TopMenuNavbar, 
	TopMenuList, 
	Badge} 
from './styles/header'
import {
	DefaultList, 
	ListItem, 
	TestsPanelList
} from './ui/StListing';

import {Searching} from './component/Search';

/**
 **Component
 **/
const Listing = (props)=>(

	<DefaultList>      		
        <div className="list-container">
            <ul>{props.list.map((data)=>
                <ListItem key={data.nameFr}>
                    <div className="list-icon-container">
                        <input  type="checkbox" 
                        		value={data.bcode} 
                        		name={data.nameFr} 
                        		onChange={props.fn} 
                        		checked={isCheckedTest(props.bilan, data.nameFr)}/>
                    </div>                            
                    { typeof data.bcode ==='undefined' ? '' 
                    		 : <div className="list-datetime"> 
                    		 		{Math.floor(data.bcode * 1.34)} MAD
                    		 	</div> 
                    }
                    <div className="list-item-content">
                    	<h3>{data.mnemonic}</h3>
                        <p>{data.nameFr}</p>
                    </div>
                </ListItem>                                                 
            )}</ul>
        </div>
    </DefaultList>
)

const SearchResult = (props)=>(
	<div>
		{props.searchBar ? 	<Row><Col sm={12} md={12}> <Searching onChange={props.searching}/><div className={props.dialog}></div></Col></Row> : ''}

		<Row>
			<Col sm={12} md={12}>
			 {props.list}
			</Col>
		</Row>
	</div>
)

const TestPanel = (props)=>(
	<Row>
		<Col sm={12} md={12}>
			<LightPortlet>
				<PortletTitle >
					<Caption>Votre Bilan</Caption>
					<PortletActions>
						<Link to={'/'}><i className="fa fa-arrow-left"></i></Link>
					</PortletActions>
				</PortletTitle>
				<PortletBody>
					<TestsPanelList>
						 <ul>{props.Bilan.map((data)=>
						 		<li key={data.name}>
						 			<div className="testname"> {data.name}</div>
						 			<div className="testoptions">
						 				<i className="fa fa-times" data={data.name} onClick={props.delete}></i></div>
						 			<div className="testprice"> {Math.floor(data.bcode * 1.34)} MAD</div>
						 		</li>
						 	 )}
						 </ul>
						 <hr/>
						 <div>Total : <span>{Math.floor(getTotalBilan(props.Bilan) * 1.34)} MAD</span></div>
					</TestsPanelList>
				</PortletBody>
			</LightPortlet>
			
		</Col>
	</Row>
)
/**
 **Index Class
 **/
class Index extends Component {

	constructor(){

		super();

		this.state = {

			test : [],
			dialog : 'closed',
			listed : '',
			searchBar : false,
			NumOfTests : 0,
            Bilan : []
		}

		this.searching = this.searching.bind(this);
		this.getAllLabTests = this.getAllLabTests.bind(this);
		this.showSearchBar = this.showSearchBar.bind(this);
		this.handleCheckedTest = this.handleCheckedTest.bind(this);
		this.deleteTestfromPanel = this.deleteTestfromPanel.bind(this);
	}

	handleCheckedTest(e){

        let isChecked = e.target.checked;

        if(isChecked){

            this.setState({NumOfTests : this.state.NumOfTests+1}) ;

            this.state.Bilan[this.state.NumOfTests] = {name : e.target.name, bcode: e.target.value };

        } else {

        	for(let i=0; i<this.state.Bilan.length; i++){

        		if(e.target.value == this.state.Bilan[i]) {
        			this.state.Bilan.splice(i, 1);
        			this.setState({NumOfTests : this.state.NumOfTests-1}) 
        		}
        	}
        }
	}

	searching(e){

		this.getAllLabTests(e.target.value);	
		this.setState({dialog : e.target.value ? 'open' : 'closed'});
	}

	getAllLabTests(query){

		if(query.length<2) this.setState({test : [], listed : ''});

		else {
			axios.get('/eLab/tests/fr?test='+query)
	           .then(response => { 
	           		
	                response.data === null ?
	                null
	                : this.setState({
	                	test : response.data, 
	                	listed :  <Listing list= {this.state.test} fn={this.handleCheckedTest} bilan={this.state.Bilan}/> 
	                }) 

	            })
	           .catch(function (error) {
	                console.log(error);
	            });
	    }
	}

	showSearchBar(props){

		return this.setState({searchBar : !this.state.searchBar})
	}

	deleteTestfromPanel(e){
		
		let test = e.target.getAttribute('data'),
			panel = this.state.Bilan, panelNum = this.state.NumOfTests;

		for(let i=0; i<panel.length; i++){

			if (test == panel[i].name){

				 panel.splice(i, 1); panelNum -=1;

				 this.setState({Bilan : panel, NumOfTests : panelNum})
			}
		}
	}

	render(){

		return(

			<Router><div>
				<PageHeader className="navbar navbar-fixed-top">
					<div className="page-header-inner">
						<Logo><a href="#">MED<span>APP</span></a></Logo>
						<TopMenu>
						 	<TopMenuNavbar>
						 		<TopMenuList className="dropdown dropdown-toggle">						 		
						 			<Link to={'/testsPanel'}>
							 			<i className="fa fa-align-justify"></i>
							 			<Badge className="badge badge-default">{this.state.NumOfTests}</Badge>
						 			</Link>				
						 		</TopMenuList>						 									 		
						 		<TopMenuList className="dropdown dropdown-toggle">
						 			<i className="fa fa-search" onClick={this.showSearchBar}></i>							 			
						 		</TopMenuList>
						 	</TopMenuNavbar>
						</TopMenu>						
					</div>
				</PageHeader>

				<LayoutMain home>
					<div className="container">
				    <Route  exact path="/" 
				    		render={props =><SearchResult list={this.state.listed} 
							    		searchBar={this.state.searchBar} 
							    		searching = {this.searching} 
							    		dialog={this.state.dialog}   
							   		/>} 
				    />
                    <Route path={'/testsPanel'} 
                    		render={props=><TestPanel 
                    							Bilan={this.state.Bilan}
                    							delete = {this.deleteTestfromPanel}
                    						/> 
                    				} 
                    		/>  
                    </div>
				</LayoutMain>

				<LayoutFooter>
					
				</LayoutFooter>
			</div></Router>
		)
	}
}

/**
 ** functions
 **/

const isCheckedTest = (bilan, test)=>{

	let checked = false;

	for(let i = 0; i<bilan.length; i++){

		if(test == bilan[i].name) checked = true;
	}

	return checked;
}

const getTotalBilan = (array)=>{

	let total = 0;

	array.forEach(arr =>{ total += Number(arr.bcode) })

	return total;
}

module.exports = ReactDOM.render(<Index />, document.getElementById('MedApp'));