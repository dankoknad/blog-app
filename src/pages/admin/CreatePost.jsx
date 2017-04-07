import React from 'react';
import {renderMarkdown} from '../../lib/helpers';

export default function CreatePost({posts, tempTitle, tempContent, updateTitle, updateContent, publishPost, isFormDirty}) {
	return (
		<div>
			<div>Create new Post. You can use <a href="http://jonschlinkert.github.io/remarkable/demo/" target="_blank" >markdown</a>: *Hello* = {<em>Hello</em>}, `World** = {<strong>World</strong>}, `from React` = {<code>from React</code>} ...</div>
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
					<div>preview:</div>
					<div className="">	
						<h2 className="text-center" dangerouslySetInnerHTML={renderMarkdown(tempTitle)} />
						<p dangerouslySetInnerHTML={renderMarkdown(tempContent)} />
					</div>
				</div>
			}			
		</div>
	)
}
