import React from 'react';
import {Link} from 'react-router-dom';
import {renderMarkdown, getDateFromTimestamp} from '../../lib/helpers';
import removeMd from 'remove-markdown';

export default function Post({ post, tempComment, updateTempComment, publishComment, handlePostLike, handleCommentLike, children }) {
	return (
		<div>
			<ol className="breadcrumb">
				<li><Link to="/posts">posts</Link></li>
				<li className="active">{removeMd(post.title)}</li>
			</ol>
			<div className="alert alert-warning text-right">post ID: {post.id}</div>
			<div className="post">
				<h3 dangerouslySetInnerHTML={renderMarkdown(post.title)} className="text-center" />
				<div dangerouslySetInnerHTML={renderMarkdown(post.content)}/>
				<div>likes: {post.likes} 
					<a onClick={(e) => handlePostLike(e, post.id, post)} className={post.liked ? "like active" : "like"} href="#"></a>
				</div>
				<div>time: {getDateFromTimestamp(post.time)}</div>
				<br/>
				<br/>
				<br/>
				<h4>Have something to say? Leave a comment:</h4>
				<div> You can use <a href="http://jonschlinkert.github.io/remarkable/demo/" target="_blank" >markdown</a>: *Hello* = {<em>Hello</em>}, **World** = {<strong>World</strong>}, `from React` = {<code>from React</code>} ...</div> <br/>
				
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
					<button onClick={(e)=> publishComment(e, post.id, post)} className="btn btn-default">Publish Comment</button>
				</div> 
				{ (tempComment.length)  
					?	<div>
							<div>Preview comment:</div>
							<div dangerouslySetInnerHTML={renderMarkdown(tempComment)} />
						</div>
					: null
				}
			</div>

			{/* Comments component: */}
			{children}
			
		</div>
	)
}
