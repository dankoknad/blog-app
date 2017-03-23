import React from 'react';
import {Link} from 'react-router-dom';

export default function Employee ({ employee, counter }){
  return (
    <div className="employee">
			<div><button onClick={counter}>Update counter!</button></div>
			<br/>
			<div><Link to="/links">{'<< '} Links home</Link></div>
      <div>id: {employee.id}</div>
      <div>first_name: {employee.first_name}</div>
      <div>last_name: {employee.last_name}</div>
      <div>title: {employee.title}</div>
      <div>job_descriptor: {employee.job_descriptor}</div>
      <div>job_area: {employee.job_area}</div>
      <div>job_type: {employee.job_type}</div>
      <div>email: {employee.email}</div>
      <div>img: <img src={employee.img} alt=".." /></div>
    </div>
  )
}