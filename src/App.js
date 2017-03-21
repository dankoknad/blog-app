import React, { Component } from 'react';
import NavLinks from './NavLinks';
import Home from './Home';
import About from './About';
import Admin from './Admin';
import Footer from './Footer';
import Employee from './Employee';
import './App.css';
import _ from 'lodash';
// import {loadEmployees, addEmployee, updateEmployee, removeEmployee} from'./helpers.js';
import {loadEmployees} from'./helpers.js';
import {
  BrowserRouter as Router,
	Match,
  Route,
  Link
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

  render() {
    const {employees} = this.state; 
    return (
      <Router>  
        <div className="clearfix">
					<NavLinks />
          <div className="sidebar">
            <h2><Link className="link" to="/">home >></Link></h2> 
            <h2 style={{paddingLeft: 10}}>employees:</h2>          
            {employees.map((employee => 
              <div key={employee.id}>
                <Link className="link" to={`/employee/${employee.id}`}>{employee.first_name} {employee.last_name}</Link>
              </div>))
            }
          </div>
          <div className="main">
            <Route exact path="/" component={Home} />
            <Route exact path="/about" component={About} />
            <Route exact path="/admin" component={Admin} />
            { employees.length && <Route path="/employee/:employeeId" render={({match}) => (
                <Employee employee={ _.find(employees, {id: match.params.employeeId})} />
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
