import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import _ from 'lodash';
import {renderMarkdown} from '../../lib/helpers';
import removeMd from 'remove-markdown';

function EditPost({posts, publishPostEdit, activePost, editTitle, editContent, removeComment, cancelEditing, setActivePost}) {
	return (
		<div>
			<div className="row">
				<div className="col-md-8">
					<p>Hello Edit Page</p>
					{(_.isEmpty(activePost)) && <p>Select a post you would like to edit</p>}
					{(!_.isEmpty(activePost)) && 
						<div>
							<div className="form-group">
								<input 
									onChange={editTitle}
									className="form-control"
									value={activePost.title ? activePost.title : ""}
									type="text"
									placeholder="Title goes here"
								/>
							</div>
							<div className="form-group">
								<textarea
									onChange={editContent}
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
										<div className="alert alert-danger">Danger zone! Remove comments</div>
										<ul className="list-group">
											<ReactCSSTransitionGroup
												transitionName="remove"
												transitionEnterTimeout={350}
												transitionLeaveTimeout={350}>
												{activePost.comments.map((comment, i, comments ) => {
													return (
															<li
																key={comment.commentId} 
																onClick={() => removeComment(comment.commentId, comments)} 
																className="list-group-item remove-group-item" 
															>
																<div>{removeMd(comment.content)}</div>
															</li>
														)
													})
												}
											</ReactCSSTransitionGroup>
										</ul>
									</div>
								: null
							}
							<div className="form-group">
								<button onClick={cancelEditing} className="btn btn-default">Cancel</button>{' '} 
								<button onClick={e => {publishPostEdit(e, activePost.id, activePost)}} className="btn btn-success">Save</button>
							</div>
						</div>
					}
				</div>

				<div className="col-md-4">
					<ul className="list-group">
						{posts.map((post, i, posts ) => {
							return	(
									<li
										key={post.id}
										className={activePost.id === post.id ? "list-group-item edit-group-item active" : "list-group-item edit-group-item"}
										onClick={(e) => setActivePost(post)}
									>
										<div>{removeMd(post.title)}</div>
										<span className="glyphicon glyphicon-comment">{post.comments.length}</span>
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

export default EditPost;
