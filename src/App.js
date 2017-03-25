import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

// components
import NavLinks from './NavLinks';
import Home from './Home';
import About from './About';
import Admin from './Admin';
import PostsLinks from './PostsLinks';
import Footer from './Footer';
import Post from './Post';

// styles
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

// helpers
import _ from 'lodash';
/* import uuidV1 from 'uuid/v1'; */
/* import {loadEmployees, addEmployee, updateEmployee, removeEmployee, getTimeStamp, getDateFromTimestamp} from'./helpers.js'; */
import {loadBlogPosts} from'./helpers.js';

class App extends Component {
  state = {
    posts: [],
		num: 5,
		tempTitle: "",
		tempContent: ""
  }

  componentDidMount(){
    loadBlogPosts('http://localhost:4020/posts')
      .then(data => this.setState({posts: data}))    
  }

	counter = (e) => {
		e.preventDefault();
		const num = this.state.num + 5;
		this.setState({num});
	}

	

	updateTitle = (e) => {
		e.preventDefault();
		this.setState({tempTitle: e.target.value});
	}
	
	updateContent = (e) => {
		e.preventDefault();
		this.setState({tempContent: e.target.value});
	}

  render() {
    const {posts, num, tempTitle, tempContent} = this.state; 
    return (
      <Router>  
        <div className="container">
					<NavLinks num={num}/>
          <div className="jumbotron">
            <Route exact path="/" component={Home} />
            <Route exact path="/about" component={About} />
            <Route exact path="/admin" render={() => (
							<Admin
								title={tempTitle}
								content={tempContent}
								updateTitle={this.updateTitle}
								updateContent={this.updateContent}
							/>
						)} />
            <Route exact path="/posts" render={() => (
                <PostsLinks posts={posts} />
              )}
						/>
            { posts.length && <Route path="/posts/:postId" render={({match}) => (
                <Post
									counter={this.counter}
									post={ _.find(posts, {id: match.params.postId})} 
								/>
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
