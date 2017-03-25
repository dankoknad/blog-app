import React from 'react';
import {Link} from 'react-router-dom';
import {getDateFromTimestamp} from './helpers';
export default function Post ({ post, renderMarkdown, counter }) {
	return (
		<div>
			<div><button onClick={counter} className="btn btn-default">Update counter!</button></div>
			<br/>
			<div><Link to="/posts">{'<< '} All posts</Link></div>
			<div>id: {post.id}</div>
			<div className="post">
				<h3 className="text-center">{post.title}</h3>
				<div dangerouslySetInnerHTML={renderMarkdown(post.content)}/>
			</div>
			<div>
				<p><strong>comments: </strong></p>
				<ul className="media-list well">
				{
					post.comments.map(comment => 
						<li key={comment.commentId} className="media list-group-item">
							<div className="media-body">
								<h4 className="media-heading">Re: {comment.commentId}</h4>
								<p dangerouslySetInnerHTML={renderMarkdown(comment.content)} />
							</div>
						</li>
				)}
				</ul>
			</div>
			<div>likes: {post.likes}</div>
			<div>time: {getDateFromTimestamp(post.time)}</div>
		</div>
	)
}

