import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {Prompt} from 'react-router-dom';
import {renderMarkdown} from '../../lib/helpers';
import removeMd from 'remove-markdown';

export default function CreateRemovePost({posts, tempTitle, tempContent, updateTitle, updateContent, publishPost, removePost}) {
	const isFormDirty = tempTitle.length + tempContent.length > 0;
	return (
		<div>
			<div>Create new Post. You can use <a href="http://jonschlinkert.github.io/remarkable/demo/" target="_blank" >markdown</a>: *Hello* = {<em>Hello</em>}, `World** = {<strong>World</strong>}, `from React` = {<code>from React</code>} ...</div> <br/>		
			<div className="form-group">
				<input 
					onChange={updateTitle}
					className="form-control"
					type="text"
					value={tempTitle}
					placeholder="Title goes here"
				/>
			</div>
			<div className="form-group">
				<textarea
					onChange={updateContent}
					className="form-control"
					value={tempContent}
					placeholder="Content goes here"
				>
				</textarea> 
			</div>
			<div className="form-group">
				<button onClick={publishPost} className="btn btn-default">Publish</button>
			</div>
				
			{isFormDirty && 
				<div>
					<div>preview:</div> <br/>
					<div className="well">	
						<h2 className="text-center" dangerouslySetInnerHTML={renderMarkdown(tempTitle)} />
						<p dangerouslySetInnerHTML={renderMarkdown(tempContent)} />
					</div>
				</div>
			}

			<div className="well">
				<div className="alert alert-danger">Danger zone! Remove comments<span className="glyphicon glyphicon-remove hide"></span></div>
				<ul className="list-group">
					<ReactCSSTransitionGroup
						transitionName="remove"
						transitionEnterTimeout={350}
						transitionLeaveTimeout={350}>
						{posts.map((post, i, posts ) => {
							return	(
									<li
										key={post.id} 
										onClick={() => removePost(post.id, posts)} 
										className="list-group-item remove-group-item" 
									>
									<div>{removeMd(post.title)}</div>
									<span className="glyphicon glyphicon-comment">{post.comments.length}</span>
									</li>
								)
							})
						} 
						</ReactCSSTransitionGroup>
				</ul>
			</div>
			<Prompt
				when={isFormDirty}
				message="Your changes are not saved!"
			/>
		</div>
	)
}