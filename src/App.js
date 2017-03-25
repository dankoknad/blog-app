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
		markdown: '**Attention!** We have some *markdown* here!\n- first list item\n- list item,\n  - jklk\n  - Inline `code`\n## h2 title'
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

	renderMarkdown = (txt) => {
		const md = new Remarkable({breaks: true});
		return { __html: md.render(txt) };
	}

  render() {
    const {posts, num} = this.state; 
    return (
      <Router>  
        <div className="container">
					<NavLinks num={num}/>
          <div className="jumbotron">
            <Route exact path="/" component={Home} />
            <Route exact path="/about" component={About} />
            <Route exact path="/admin" component={Admin} />
            <Route exact path="/posts" render={() => (
                <Links posts={posts} />
              )}
						/>
            { posts.length && <Route path="/posts/:postId" render={({match}) => (
                <Post
									counter={this.counter}
									post={ _.find(posts, {id: match.params.postId})} 
									renderMarkdown={this.renderMarkdown}
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
