import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      <h2 className="text-center">This is the Home Page</h2>
      <div>As you can see, there is not much going on here. You might want to check <Link to="/posts">Posts</Link> page?</div>
    </div>
  )
}
