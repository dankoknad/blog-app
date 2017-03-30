import React, { Component } from 'react';
import _ from 'lodash';
import {renderMarkdown} from './helpers';
import removeMd from 'remove-markdown';

class EditPost extends Component {
	state = {
		activePost: {}
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
		const isApproved = confirm("Are you sure you want't to remove this comment?");
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

	render() {
		const {posts, publishPostEdit} = this.props;
		const {activePost}= this.state;
		return (
			<div>
				<div className="row">
					<div className="col-sm-8">
						<p>Hello Edit Page</p>
						<p>Select a post you would like to edit</p>
						{(!_.isEmpty(this.state.activePost)) && <p>That's the spirit!</p>}
						{(!_.isEmpty(this.state.activePost)) && 
							<div>
								<div className="form-group">
									<input 
										onChange={this.editTitle}
										className="form-control"
										value={activePost.title ? activePost.title : ""}
										type="text"
										placeholder="Title goes here"
									/>
								</div>
								<div className="form-group">
									<textarea
										onChange={this.editContent}
										value={activePost.content ? activePost.content : ""}
										className="form-control"
										placeholder="Content goes here"
										rows="6"
									>
									</textarea> 
								</div>

								<div>preview:</div> <br/>
								<div className="well">	
									<h2 className="text-center" dangerouslySetInnerHTML={renderMarkdown(activePost.title)} />
									<p dangerouslySetInnerHTML={renderMarkdown(activePost.content)} />
								</div>

								{(activePost.comments.length)  
									? <div>
											<div className="alert alert-danger">Danger zone - remove comments</div>
											<ul className="list-group">
												{activePost.comments.map((comment, i, comments ) => {
													return (
															<li
																key={comment.commentId} 
																onClick={() => this.removeComment(comment.commentId, comments)} 
																className="list-group-item remove-group-item" 
															>
																<div>{removeMd(comment.content)}</div>
															</li>
														)
													})
												}
											</ul>
										</div>
									: null
								}
								<div className="form-group">
									<button onClick={this.cancelEditing} className="btn btn-default">I'm done</button>{' '} 
									<button onClick={e => {publishPostEdit(e, activePost.id, activePost)}} className="btn btn-default">Publish edited</button>
								</div>
							</div>
						}
					</div>

					<div className="col-sm-4">
						<ul className="list-group">
							{posts.map((post, i, posts ) => {
								return	(
										<li
											key={post.id}
											className={activePost.id === post.id ? "list-group-item edit-group-item active" : "list-group-item edit-group-item"}
											onClick={(e) => this.setActivePost(post)}
										>
											<div>{removeMd(post.title)}</div>
											<span className="badge">{post.comments.length}</span>
										</li>
									)
								})
							} 
							</ul>
					</div>
				</div>
			</div>
		);
	}
}

export default EditPost;
