import React from 'react';
import {Link} from 'react-router-dom';
import {renderMarkdown, getDateFromTimestamp} from './helpers';

export default function Post ({ post }) {
	return (
		<div>
			<div><Link to="/posts">{'<< '} All posts</Link></div>
			<div>id: {post.id}</div>
			<div className="post">
				<h3 dangerouslySetInnerHTML={renderMarkdown(post.title)} className="text-center" />
				<div dangerouslySetInnerHTML={renderMarkdown(post.content)}/>
			</div>
			{	(post.comments.length) 
				?	<div>
						<p><strong>comments: </strong></p>
						<ul className="media-list well">
						{post.comments.map(comment => 
							<li key={comment.commentId} className="media list-group-item">
								<div className="media-body">
									<h4 className="media-heading">Re: {comment.commentId}</h4>
									<p dangerouslySetInnerHTML={renderMarkdown(comment.content)} />
								</div>
							</li>
						)}
						</ul>
					</div>
				: null
			}
			<div>likes: {post.likes}</div>
			<div>time: {getDateFromTimestamp(post.time)}</div>
		</div>
	)
}
