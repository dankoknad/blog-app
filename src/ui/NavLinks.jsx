import React from 'react';
import { NavLink } from 'react-router-dom';

export default function NavNavLinks (){
  return (
    <ul className="list-inline main-nav">
      <li><NavLink exact activeClassName="active" to="/">Home</NavLink></li>
      <li><NavLink exact activeClassName="active" to="/posts">Posts</NavLink></li>
      <li><NavLink activeClassName="active" to="/admin">Admin</NavLink></li>
      <li><NavLink activeClassName="active" to="/about">About</NavLink></li>
    </ul>
  )
}