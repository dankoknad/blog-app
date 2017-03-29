// import React from 'react';
import React, { Component } from 'react';
import _ from 'lodash';
import {renderMarkdown} from './helpers';


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
		
		(!_.isEmpty(this.state.activePost)) ? this.setState({
			activePost: {
				...this.state.activePost,
				title: editedTitle
			}
		})
		: alert("You haven't selected any post to edit. Please select one.")
	}

	editContent = (e) => {
		const editedContent = e.target.value;

		(!_.isEmpty(this.state.activePost)) ? this.setState({
			activePost: {
				...this.state.activePost,
				content: editedContent
			}
		})
		: alert("You haven't selected any post to edit. Please select one.")
	}

	render() {
		const {posts} = this.props;
		const {activePost}= this.state;
		return (
			<div>
				<div>Hello Edit Page</div>
				<div className="row">
					<div className="col-sm-8">
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
							>
							</textarea> 
						</div>
						<div className="form-group">
							<button onClick={this.cancelEditing} className="btn btn-default">Cancel editing</button>{' '} 
							<button onClick={e => console.log('button is clicked')} className="btn btn-default">Publish edited</button>
						</div>
						<div>preview:</div> <br/>
						<div className="well">	
							<h2 className="text-center" dangerouslySetInnerHTML={renderMarkdown(activePost.title)} />
							<p dangerouslySetInnerHTML={renderMarkdown(activePost.content)} />
						</div>
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
											<span dangerouslySetInnerHTML={renderMarkdown(post.title)}/>
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
