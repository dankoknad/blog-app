import React from 'react';
import {Link} from 'react-router-dom';
import {renderMarkdown} from './helpers';

export default function postsLinks ({posts}){
  return (
    <div>
      <h2>Posts:</h2>
      {posts.map(post => {
				const {id, title, comments} = post;
				return (
						<div key={id}>
							<Link className="link" to={`/posts/${id}`} dangerouslySetInnerHTML={renderMarkdown(title)} />
							<span className="badge">{comments.length}</span>
						</div>
					)
				})
			}
    </div>
  )
}