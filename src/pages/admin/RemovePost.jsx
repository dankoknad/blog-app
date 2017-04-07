import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import removeMd from 'remove-markdown';

export default function RemovePost({posts, removePost}) {
	return (		
		<div className="">
			<div className="alert alert-danger">Danger zone! Remove posts<span className="glyphicon glyphicon-remove hide"></span></div>
			<ul className="list-group">
				<ReactCSSTransitionGroup
					transitionName="remove"
					transitionEnterTimeout={350}
					transitionLeaveTimeout={350}
				>
					{posts.map((post, i, posts ) => {
							return (
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
	)
}
