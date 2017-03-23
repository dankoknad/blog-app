import React from 'react';
import { Link } from 'react-router-dom';

export default function NavLinks ({num}){
  return (
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/about">About</Link></li>
      <li><Link to="/admin">Admin</Link></li>
      <li><Link to="/links">Links</Link></li>
			<h1>{num}</h1>
    </ul>
  )
}