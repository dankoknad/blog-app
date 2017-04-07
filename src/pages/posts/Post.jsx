import React from 'react';
import {Link} from 'react-router-dom';
import CommentForm from './CommentForm';
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
				<CommentForm
					post={post}
					updateTempComment={updateTempComment}
					tempComment={tempComment}
					publishComment={publishComment}
				/>
			</div>
			{/* Comments component: */}
			{children}			
		</div>
	)
}
