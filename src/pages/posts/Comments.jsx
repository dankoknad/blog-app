import React from 'react';
import {renderMarkdown, getDateFromTimestamp} from '../../lib/helpers';

export default function Comments({post, handleCommentLike}) {
	return (
		(post.comments.length) 
		?	<div>
				<p><strong>comments: </strong></p>
				<ul className="media-list well">
					{post.comments.map(comment => 
						<li key={comment.commentId} className="media list-group-item">
							<div className="media-body">
								<p dangerouslySetInnerHTML={renderMarkdown(comment.content)} />
								<div className="text-right text-muted">
									<span className="pull-left">Likes: {comment.likes} 
										<a onClick={(e) => handleCommentLike(e, comment, comment.commentId, post, post.id)  } className={comment.liked ? "like active" : "like"} href="#"></a>
									</span> commented on: {getDateFromTimestamp(comment.time)}
								</div>
							</div>
						</li>
					)}
				</ul>
			</div>
		: null
	)
}
