import React from 'react';
import {Prompt} from 'react-router-dom';
import {renderMarkdown} from './helpers';

export default function Admin({title, content, updateTitle, updateContent}) {
	return (
		<div>
			<p>This is the Admin page</p>
			<div>Create new Post. You can use markdown: *Hello* = {<em>Hello</em>}, `World** = {<strong>World</strong>}, `from React` = {<code>from React</code>} . <small><a href="http://jonschlinkert.github.io/remarkable/demo/" target="_blank" >Show me more examples</a></small></div> <br/>
		
			<div className="form-group">
				<input onChange={updateTitle} className="form-control" type="text" value={title}/>
			</div>
			<div>
				<textarea onChange={updateContent} className="form-control" value={content} ></textarea> 
			</div> <br/>

			<div>preview:</div>
			<h2 className="text-center" dangerouslySetInnerHTML={renderMarkdown(title)} />
			<p dangerouslySetInnerHTML={renderMarkdown(content)} />
			<Prompt
				when={title.length > 0 || content.length > 0}
				message="Your changes are not saved!"
			/>
		</div>
	)
}