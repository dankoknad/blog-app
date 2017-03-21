import React from 'react';
import { Link } from 'react-router-dom';

export default function NavLinks (){
  return (
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/about">About</Link></li>
      <li><Link to="/admin">Admin</Link></li>
    </ul>
  )
}