import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {Prompt} from 'react-router-dom';
import {renderMarkdown} from './helpers';
import removeMd from 'remove-markdown';

export default function Admin({posts, title, content, updateTitle, updateContent, publishPost, removePost}) {
	const isFormDirty = title.length + content.length > 0;
	return (
		<div>
			<p>This is the Admin page</p>
			<div>Create new Post. You can use <a href="http://jonschlinkert.github.io/remarkable/demo/" target="_blank" >markdown</a>: *Hello* = {<em>Hello</em>}, `World** = {<strong>World</strong>}, `from React` = {<code>from React</code>} ...</div> <br/>		
			<div className="form-group">
				<input 
					onChange={updateTitle}
					className="form-control"
					type="text"
					value={title}
					placeholder="Title goes here"
				/>
			</div>
			<div className="form-group">
				<textarea
					onChange={updateContent}
					className="form-control"
					value={content}
					placeholder="Content goes here"
				>
				</textarea> 
			</div>
			<div className="form-group">
				<button onClick={publishPost} className="btn btn-default">Publish</button>
			</div>

			<div>preview:</div> <br/>
			<div className={isFormDirty ? "well" : null}>	
				<h2 className="text-center" dangerouslySetInnerHTML={renderMarkdown(title)} />
				<p dangerouslySetInnerHTML={renderMarkdown(content)} />
			</div>
			<hr/>
			<div className="well">
				<h3 className="text-danger">Danger zone!</h3>
				<div className="alert alert-danger">Remove items: <span className="glyphicon glyphicon-remove hide"></span></div>
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
									<span className="badge">{post.comments.length}</span>
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