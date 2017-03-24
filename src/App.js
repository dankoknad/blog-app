import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import Remarkable from 'remarkable';

// components
import NavLinks from './NavLinks';
import Home from './Home';
import About from './About';
import Admin from './Admin';
import Links from './Links';
import Footer from './Footer';
import Employee from './Employee';

// styles
// import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

// helpers
import _ from 'lodash';
/* import uuidV1 from 'uuid/v1'; */
/* import {loadEmployees, addEmployee, updateEmployee, removeEmployee, getTimeStamp, getDateFromTimestamp} from'./helpers.js'; */
import {loadEmployees} from'./helpers.js';

class App extends Component {
  state = {
    employees: [],
		num: 5,
		markdown: '**Attention!** We have some *markdown* here!\n- first list item\n- list item,\n  - jklk\n  - Inline `code`\n## h2 title'
  }

  componentDidMount(){
    loadEmployees('http://localhost:4020/employees')
      .then(employees => this.setState({employees}))    
  }

	counter = (e) => {
		e.preventDefault();
		const num = this.state.num + 5;
		this.setState({num});
	}

	getRawMarkup = () => {
    const md = new Remarkable({breaks: true});
    return { __html: md.render(this.state.markdown) };
  }

  render() {
    const {employees, num} = this.state; 
    return (
      <Router>  
        <div className="container">
					<NavLinks num={num}/>
					<div dangerouslySetInnerHTML={this.getRawMarkup()} />
          <div className="">
            <Route exact path="/" component={Home} />
            <Route exact path="/about" component={About} />
            <Route exact path="/admin" component={Admin} />
            <Route exact path="/links" render={() => (
                <Links employees={employees} />
              )}
						/>
            { employees.length && <Route path="/employee/:employeeId" render={({match}) => (
                <Employee counter={this.counter} employee={ _.find(employees, {id: match.params.employeeId})} />
              )} />
            }
          </div>
					<Footer />
        </div>
      </Router>
    );
  }
}

export default App;
