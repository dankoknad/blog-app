import React from 'react';
import {Link} from 'react-router-dom';

export default function postsLinks ({posts}){
  return (
    <div>
      <h2>Links Page</h2>
      {posts.map((post => 
				<div key={post.id}>
					<Link className="link" to={`/posts/${post.id}`}>{post.title}</Link>
				</div>))
			}
    </div>
  )
}