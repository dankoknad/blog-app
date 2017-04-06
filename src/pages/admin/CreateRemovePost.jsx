import React from 'react';
import {Prompt} from 'react-router-dom';
import CreatePost from './CreatePost';
import RemovePost from './RemovePost';

export default function CreateRemovePost({posts, tempTitle, tempContent, updateTitle, updateContent, publishPost, removePost}) {
	const isFormDirty = tempTitle.length + tempContent.length > 0;
	return (
		<div>
			<CreatePost 
				posts={posts}
				tempTitle={tempTitle}
				tempContent={tempContent}
				updateTitle={updateTitle}
				updateContent={updateContent}
				publishPost={publishPost}
				isFormDirty={isFormDirty}
			/>
			<RemovePost posts={posts} removePost={removePost} />
			<Prompt
				when={isFormDirty}
				message="Your changes are not saved!"
			/>
		</div>
	)
}
