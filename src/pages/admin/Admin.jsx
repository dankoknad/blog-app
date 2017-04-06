import React from 'react';

export default function Admin({children, toggleAdminTabs, activeTab}) {
	return (
		<div>
			<h2 className="text-center">This is the Admin page</h2>
			<br/>
			<ul className="nav nav-tabs">
				<li role="presentation" className={activeTab ? "active" : null}><a onClick={toggleAdminTabs} data-tab="1" href="#">Create / Remove Post</a></li>
				<li role="presentation" className={!activeTab ? "active" : null}><a onClick={toggleAdminTabs} data-tab="0" href="#">Edit Post</a></li>
			</ul>
			<br/><br/>
			{children}			
		</div>
	)
}
