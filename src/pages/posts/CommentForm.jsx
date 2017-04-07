import React from 'react';
import {renderMarkdown} from '../../lib/helpers';

export default function CommentForm({ post, tempComment, updateTempComment, publishComment, handlePostLike, handleCommentLike, children }) {
	return (
		<div>
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
	)
}
