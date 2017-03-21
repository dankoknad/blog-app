import React from 'react';

export default function Employee ({ employee }){
  return (
    <div className="employee">
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