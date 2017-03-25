import React, { Component } from 'react';

export default class Admin extends Component {
	state = {
		title: "",
		content: ""
	}

	updateTitle = (e) => {
		e.preventDefault();
		this.setState({title: e.target.value});
	}
	
	updateContent = (e) => {
		e.preventDefault();
		this.setState({content: e.target.value});
	}

	render(){
		return (
			<div>
				<p>This is the Admin page</p>
				<div>Create new Post. You can use markdown: *Hello* = {<em>Hello</em>}, `World** = {<strong>World</strong>}, `from React` = {<code>from React</code>} ..</div> <br/>
				<div className="form-group">
					<input onChange={this.updateTitle} className="form-control" type="text" value={this.state.title}/>
				</div>
				<div>
					<textarea onChange={this.updateContent} className="form-control" value={this.state.content} ></textarea> 
				</div> <br/>

				<div>preview:</div>
				<h2 dangerouslySetInnerHTML={this.props.renderMarkdown(this.state.title)} />
				<p dangerouslySetInnerHTML={this.props.renderMarkdown(this.state.content)} />
			</div>
		)
	}
}