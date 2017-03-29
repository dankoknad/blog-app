import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {renderMarkdown} from './helpers';

export default function Edit ({posts}){
  return (
    <div>
			<div>Hello Edit Page</div>
			<div className="row">
				<div className="col-sm-8">form</div>
				<div className="col-sm-4">
					<ul className="list-group">
							<ReactCSSTransitionGroup
								transitionName="edit"
								transitionEnterTimeout={350}
								transitionLeaveTimeout={350}>
								{posts.map((post, i, posts ) => {
									return	(
											<li
												key={post.id} 
												className="list-group-item edit-group-item" 
											>
												<span dangerouslySetInnerHTML={renderMarkdown(post.title)}/>
											</li>
										)
									})
								} 
								</ReactCSSTransitionGroup>
						</ul>
				</div>
			</div>
		</div>
  )
}