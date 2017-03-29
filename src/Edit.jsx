import React, {Component} from 'react';
import {renderMarkdown} from './helpers';

class Edit extends Component {
	render() {
		const {posts, setActivePost, activePost} = this.props;
		return (
			<div>
				<div>Hello Edit Page</div>
				<div className="row">
					<div className="col-sm-8">
						<div className="form-group">
							<input 
								onChange={e => console.log('change in input')}
								className="form-control"
								value={activePost.title}
								type="text"
								placeholder="Title goes here"
							/>
						</div>
						<div className="form-group">
							<textarea
								onChange={e => console.log('change in textarea')}
								value={activePost.content}
								className="form-control"
								placeholder="Content goes here"
							>
							</textarea> 
						</div>
						<div className="form-group">
							<button onClick={e => console.log('button is clicked')} className="btn btn-default">Publish edited</button>
						</div>
					</div>
					<div className="col-sm-4">
						<ul className="list-group">
							{posts.map((post, i, posts ) => {
								return	(
										<li
											key={post.id}
											className={activePost.id === post.id ? "list-group-item edit-group-item active" : "list-group-item edit-group-item"}
											onClick={()=> setActivePost(post)}
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
}

export default Edit;
