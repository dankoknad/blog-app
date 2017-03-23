import React, { Component } from 'react';
import NavLinks from './NavLinks';
import Home from './Home';
import About from './About';
import Admin from './Admin';
import Links from './Links';
import Footer from './Footer';
import Employee from './Employee';
import './App.css';
import _ from 'lodash';
// import {loadEmployees, addEmployee, updateEmployee, removeEmployee} from'./helpers.js';
import {loadEmployees} from'./helpers.js';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

class App extends Component {
  state = {
    employees: [],
		num: 5
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

  render() {
    const {employees, num} = this.state; 
    return (
      <Router>  
        <div className="clearfix">
					<NavLinks num={num}/>
          <div className="main">
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
