import React from 'react';
import {Link} from 'react-router-dom';
import removeMd from 'remove-markdown';

export default function postsLinks({posts}) {
  return (
    <div>
      <h2>Posts:</h2>
				<ul className="list-group row">
					{posts.map(post => {
						const {id, title, comments, likes, liked} = post;
						return (
							<div key={id} className="col-sm-6 col-md-4">
								<Link className="list-group-item" to={`/posts/${id}`} >
									{removeMd(title)}
									{(likes) 
										? <span className={(liked) ? "glyphicon glyphicon-heart active" : "glyphicon glyphicon-heart"} aria-hidden="true"></span> 
										: null
									}
									<span className="glyphicon glyphicon-comment">{comments.length}</span>
								</Link>
							</div>
							)
						})
					}
				</ul>
    </div>
  )
}
