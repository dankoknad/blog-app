import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

// components
import NavLinks from './ui/NavLinks';
import Home from './pages/home/Home';
import About from './pages/about/About';
import EditPost from './pages/admin/EditPost';
import Admin from './pages/admin/Admin';
import PostsLinks from './pages/posts/PostsLinks';
import Footer from './ui/Footer';
import Post from './pages/posts/Post';
import Comments from './pages/posts/Comments';
import CreateRemovePost from './pages/admin/CreateRemovePost';

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
	getTimeStamp,
	updatePost
} from'./lib/helpers';

// Main Application Component
class App extends Component {
  state = {
    posts: [],
		tempTitle: "",
		tempContent: "",
		tempComment: "",
		activePost: {},
		isCreateRemovePostActive: 1
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
		const isApproved = confirm("Are you sure you want't to remove this post?");

		if(isApproved){
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

	publishComment = (e, id, post) => {
		e.preventDefault();

		const newComment = {
			commentId: uuidV1(),
			time: + getTimeStamp(),
			author: "Captain Anonymous",
			content: this.state.tempComment,
			liked: false,
			likes: 0
		}

		const commentedPost = {
			...post, 
			...{commented: true},
			...{comments: [ newComment, ...post.comments]}
		}

		const whichIndex = _.findIndex(this.state.posts, o => o.id === id);

		if (this.state.tempComment.length){
			updatePost("http://localhost:4020/posts", id, commentedPost);
			this.setState({
				posts: [
					...this.state.posts.slice(0, whichIndex),
					commentedPost,
					...this.state.posts.slice(whichIndex + 1)
				],
				tempComment: ""
			});
		}
	}

	publishPostEdit = (e, id, editedPost) => {
		e.preventDefault();
		const whichIndex = _.findIndex(this.state.posts, o => o.id === id);

		id && updatePost("http://localhost:4020/posts", id, editedPost);

		id && this.setState({
			posts: [
				...this.state.posts.slice(0, whichIndex),
				editedPost,
				...this.state.posts.slice(whichIndex + 1)
			]
		});
	}

	setActivePost = (obj) => {
		this.setState({activePost: obj});
	} 

	cancelEditing = (e) => {
		this.setState({activePost: {}});
	}

	editTitle = (e) => {
		const editedTitle = e.target.value;
		
		this.setState({
			activePost: {
				...this.state.activePost,
				title: editedTitle
			}
		})
	}

	editContent = (e) => {
		const editedContent = e.target.value;

		this.setState({
			activePost: {
				...this.state.activePost,
				content: editedContent
			}
		})
	}

	removeComment = (id, comments) => {
		const whichIndex = _.findIndex(comments, o => o.commentId === id);
		const isApproved = confirm("Are you sure you want't to remove this comment? After clicking on Save button, this comment will be removed permanently");
		const isCommented = comments.length > 1;

		if(isApproved){
			let reducedComments = [
				...comments.slice(0, whichIndex),
				...comments.slice(whichIndex + 1)
			]

			this.setState({
				activePost: {
					...this.state.activePost,
					commented: isCommented,
					comments: reducedComments
				}
			});
		}
	}

	toggleAdminTabs = (e) => {
		e.preventDefault();
		this.setState({isCreateRemovePostActive: Number(e.target.getAttribute("data-tab"))});
	}

	handlePostLike = (e, id, post) => {
		e.preventDefault();
		
		const likedPost = {
			...post, 
			...{liked: !post.liked},
			...{likes: post.liked ? post.likes - 1 : post.likes + 1}
		}

		const whichIndex = _.findIndex(this.state.posts, o => o.id === id);

		this.setState({
			posts: [
				...this.state.posts.slice(0, whichIndex),
				likedPost,
				...this.state.posts.slice(whichIndex + 1)
			]
		});		

		updatePost("http://localhost:4020/posts", id, likedPost);
	}

	handleCommentLike = (e, comment, commentId, post, postId) => {												 
		e.preventDefault();

		const whichPostIndex = _.findIndex(this.state.posts, o => o.id === postId);
		const whichCommentIndex = _.findIndex(post.comments, o => o.commentId === commentId);

		const updatedComment = {
			...comment,
			liked: !comment.liked,
			likes: (comment.liked) ? comment.likes - 1 : comment.likes + 1
		}

		const updatedCommnets = [	
			...post.comments.slice(0, whichCommentIndex),
			updatedComment,
			...post.comments.slice(whichCommentIndex + 1)	
		]

		const updatedPost = {
			...post,
			comments: updatedCommnets
		}

		this.setState({
			posts: [
				...this.state.posts.slice(0, whichPostIndex),
				updatedPost,
				...this.state.posts.slice(whichPostIndex + 1)
			]
		});

		updatePost("http://localhost:4020/posts", postId, updatedPost);
	}

  render() {
    const {posts, tempTitle, tempContent, tempComment, isCreateRemovePostActive, activePost} = this.state; 
    return (
      <Router>  
        <div className="container">
					<NavLinks />
          <div className="jumbotron">
            <Route exact path="/" component={Home} />
            <Route exact path="/admin" render={() => (
							<Admin toggleAdminTabs={this.toggleAdminTabs} activeTab={isCreateRemovePostActive}>
								{(isCreateRemovePostActive)
								?	<CreateRemovePost 
										tempTitle={tempTitle}
										tempContent={tempContent}
										posts={posts}
										updateTitle={this.updateTitle}
										updateContent={this.updateContent}
										publishPost={this.publishPost}
										removePost={this.removePost}								
									/>
								:	<EditPost
										publishPostEdit={this.publishPostEdit}
										editTitle={this.editTitle}
										editContent={this.editContent}
										removeComment={this.removeComment}
										cancelEditing={this.cancelEditing}
										setActivePost={this.setActivePost}
										activePost={activePost}
										posts={posts}
									/>}
							</Admin>
						)} />
            <Route exact path="/posts" render={() => (
                <PostsLinks posts={posts} />
              )}
						/>
            {	(posts.length) 
							? <Route path="/posts/:postId" render={({match}) => {
									const post = _.find(posts, {id: match.params.postId});
									return (
										<Post
											post={post}
											tempComment={tempComment}
											updateTempComment={this.updateTempComment}
											publishComment={this.publishComment}
											handlePostLike={this.handlePostLike} 
										>
											<Comments 
												post={post}
												handleCommentLike={this.handleCommentLike}
											/>
										</Post>
									)
								}} />
							: null
						}
            <Route exact path="/about" component={About} />
          </div>
					<Footer />
        </div>
      </Router>
    );
  }
}

export default App;
