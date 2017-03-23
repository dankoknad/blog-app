import React from 'react';
import {Link} from 'react-router-dom';

export default function Links ({employees}){
  return (
    <div style={{padding: 10}}>
      <h2>Links Page</h2>
      {employees.map((employee => 
				<div key={employee.id}>
					<Link className="link" to={`/employee/${employee.id}`}>{employee.first_name} {employee.last_name}</Link>
				</div>))
			}
    </div>
  )
}