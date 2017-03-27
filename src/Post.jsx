import React from 'react';
import {Link} from 'react-router-dom';
import {renderMarkdown, getDateFromTimestamp} from './helpers';

export default function Post ({ post, tempComment, updateTempComment, publishComment }) {
	return (
		<div>
			<div><Link to="/posts">{'<< '} All posts</Link></div>
			<div>id: {post.id}</div>
			<div className="post">
				<h3 dangerouslySetInnerHTML={renderMarkdown(post.title)} className="text-center" />
				<div dangerouslySetInnerHTML={renderMarkdown(post.content)}/>
				<div>likes: {post.likes}</div>
				<div>time: {getDateFromTimestamp(post.time)}</div>

				<h4>Have something to say? Leave a comment</h4>
				<div> You can use <strong>markdown</strong>:</div>
				<div>*Hello* = {<em>Hello</em>}, `World** = {<strong>World</strong>}, `from React` = {<code>from React</code>} . <small><a href="http://jonschlinkert.github.io/remarkable/demo/" target="_blank" >Show me more examples</a></small></div> <br/>
				
				<div className="form-group">
					<textarea
						onChange={updateTempComment}
						className="form-control"
						value={tempComment}
						placeholder="Content goes here"
					>
					</textarea> 
				</div>
				<div className="form-group text-right">
					<button onClick={publishComment} className="btn btn-default">Publish Comment</button>
				</div>
				{ (tempComment.length)  
					?	<div>
							<div>Preview comment:</div>
							<div>{tempComment}</div>
						</div>
					: null
				}


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
		</div>
	)
}
