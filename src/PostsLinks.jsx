import React from 'react';
import {Link} from 'react-router-dom';
import {renderMarkdown} from './helpers';
import removeMd from 'remove-markdown';

export default function postsLinks ({posts}){
  return (
    <div>
      <h2>Posts:</h2>
				<ul className="list-group row">
					{posts.map(post => {
						const {id, title, comments} = post;
						return (
							<div className="col-sm-4">
								<Link key={id} className="list-group-item" to={`/posts/${id}`} >
									{removeMd(title)}
									<span className="badge">{comments.length}</span>
								</Link>
							</div>
							)
						})
					}
				</ul>
    </div>
  )
}