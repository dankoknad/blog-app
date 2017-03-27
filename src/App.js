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
import uuidV1 from 'uuid/v1';
import {
	loadBlogPosts,
	publishPost,
	removePost,
	getTimeStamp
} from'./helpers.js';

class App extends Component {
  state = {
    posts: [],
		tempTitle: "",
		tempContent: "",
		tempComment: ""
  }

  componentDidMount(){
    loadBlogPosts('http://localhost:4020/posts')
      .then(data => {
			  const ordered =	_.orderBy(data, (o) => o.time, 'desc' );
				this.setState({posts: ordered})
			})    
  }

	updateTitle = (e) => {
		e.preventDefault();
		this.setState({tempTitle: e.target.value});
	}
	
	updateContent = (e) => {
		e.preventDefault();
		this.setState({tempContent: e.target.value});
	}

	publishPost = (e) => {
		e.preventDefault();
		const post = {
			id: uuidV1(),
			title: this.state.tempTitle,
			content: this.state.tempContent,
			time: + getTimeStamp(),
			liked: false,
			likes: 0,
			commented: false,
			comments: []
		}

		if(this.state.tempTitle && this.state.tempContent){
			publishPost(post, "http://localhost:4020/posts");

			this.setState({
				tempTitle: "",
				tempContent: "",
				posts: [
					...[post],
					...this.state.posts]
			});	
		}
	}

	removePost = (id, posts) => {
		const whichIndex = _.findIndex(this.state.posts, o => o.id === id);
		const approve = confirm("Are you sure you want't to remove this item?");

		if(approve){
			removePost("http://localhost:4020/posts", id);

			this.setState({
				posts: [
					...posts.slice(0, whichIndex),
					...posts.slice(whichIndex + 1)
				]
			});
		}

	}

	updateTempComment = (e) => {
		e.preventDefault();
		this.setState({tempComment: e.target.value});		
	}

	publishComment = (e) => {
		e.preventDefault();
		console.log(this.state.tempComment);
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
								posts={posts}
								updateTitle={this.updateTitle}
								updateContent={this.updateContent}
								publishPost={this.publishPost}
								removePost={this.removePost}
							/>
						)} />
            <Route exact path="/posts" render={() => (
                <PostsLinks posts={posts} />
              )}
						/>
            { posts.length && <Route path="/posts/:postId" render={({match}) => (
                <Post
									post={ _.find(posts, {id: match.params.postId})}
									tempComment={this.state.tempComment}
									updateTempComment={this.updateTempComment}
									publishComment={this.publishComment}
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
