import React from 'react';
import {renderMarkdown} from './helpers';

function Edit ({posts, setActivePost, activePost, cancelEditing}) {
	// const isFormDirty = activePost.title.length + activePost.content.length > 0;
	return (
		<div>
			<div>Hello Edit Page</div>
			<div className="row">
				<div className="col-sm-8">
					<div className="form-group">
						<input 
							onChange={e => console.log('change in input')}
							className="form-control"
							value={activePost.title ? activePost.title : ""}
							type="text"
							placeholder="Title goes here"
						/>
					</div>
					<div className="form-group">
						<textarea
							onChange={e => console.log('change in textarea')}
							value={activePost.content ? activePost.content : ""}
							className="form-control"
							placeholder="Content goes here"
						>
						</textarea> 
					</div>
					<div className="form-group">
						<button onClick={cancelEditing} className="btn btn-default">Cancel editing</button>{' '} 
						<button onClick={e => console.log('button is clicked')} className="btn btn-default">Publish edited</button>
					</div>
					<div>preview:</div> <br/>
					<div className="well">	
						<h2 className="text-center" dangerouslySetInnerHTML={renderMarkdown(activePost.title)} />
						<p dangerouslySetInnerHTML={renderMarkdown(activePost.content)} />
					</div>
				</div>

				<div className="col-sm-4">
					<ul className="list-group">
						{posts.map((post, i, posts ) => {
							return	(
									<li
										key={post.id}
										className={activePost.id === post.id ? "list-group-item edit-group-item active" : "list-group-item edit-group-item"}
										onClick={(e) => setActivePost(post)}
									>
										<span dangerouslySetInnerHTML={renderMarkdown(post.title)}/>
									</li>
								)
							})
						} 
						</ul>
				</div>
			</div>
		</div>
	);
}

export default Edit;
