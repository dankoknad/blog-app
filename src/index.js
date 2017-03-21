import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// import Nav from './Nav';
// import Sidebar from './Sidebar';
// import Home from './Home';
// import About from './About';
import './index.css';

// import {
//   BrowserRouter as Router,
//   Route
// } from 'react-router-dom';


  /*
  <Router>
    <div>
      <Nav/>
      <Sidebar/>
      <Route exact path="/" component={Home}/>
      <Route path="/about" component={About}/>
    </div>
  </Router>,
  */

ReactDOM.render(<App />,
  document.getElementById('root')
);
